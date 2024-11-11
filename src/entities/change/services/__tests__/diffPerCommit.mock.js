export const diffPerCommit = `
diff --git a/docs/api/en/renderers/WebGLRenderer.html b/docs/api/en/renderers/WebGLRenderer.html
index ad2f41a6271c85..11af5a9b892bcd 100644
--- a/docs/api/en/renderers/WebGLRenderer.html
+++ b/docs/api/en/renderers/WebGLRenderer.html
@@ -380,7 +380,7 @@ <h3>
 		</p>

 		<h3>
-			[method:undefined copyTextureToTexture]( [param:Texture srcTexture], [param:Texture dstTexture], [param:Box2 srcRegion] | [param:Box3 srcRegion], [param:Vector2 dstPosition] | [param:Vector3 dstPosition], [param:Number dstLevel] )
+			[method:undefined copyTextureToTexture]( [param:Texture srcTexture], [param:Texture dstTexture], [param:Box2 srcRegion] | [param:Box3 srcRegion], [param:Vector2 dstPosition] | [param:Vector3 dstPosition], [param:Number srcLevel], [param:Number dstLevel] )
 		</h3>
 		<p>
 			Copies the pixels of a texture in the bounds '[page:Box3 srcRegion]' in the destination texture starting from the given position.
diff --git a/src/renderers/WebGLRenderer.js b/src/renderers/WebGLRenderer.js
index dc6219794ceee2..5c25de2cde1fb5 100644
--- a/src/renderers/WebGLRenderer.js
+++ b/src/renderers/WebGLRenderer.js
@@ -2563,7 +2563,9 @@ class WebGLRenderer {

 		};

-		this.copyTextureToTexture = function ( srcTexture, dstTexture, srcRegion = null, dstPosition = null, level = 0 ) {
+		const _srcFramebuffer = _gl.createFramebuffer();
+		const _dstFramebuffer = _gl.createFramebuffer();
+		this.copyTextureToTexture = function ( srcTexture, dstTexture, srcRegion = null, dstPosition = null, srcLevel = 0, dstLevel = null ) {

 			// support previous signature with dstPosition first
 			if ( srcTexture.isTexture !== true ) {
@@ -2574,15 +2576,33 @@ class WebGLRenderer {
 				dstPosition = arguments[ 0 ] || null;
 				srcTexture = arguments[ 1 ];
 				dstTexture = arguments[ 2 ];
-				level = arguments[ 3 ] || 0;
+				dstLevel = arguments[ 3 ] || 0;
 				srcRegion = null;

 			}

+			// support the previous signature with just a single dst mipmap level
+			if ( dstLevel === null ) {
+
+				if ( srcLevel !== 0 ) {
+
+					// @deprecated, r171
+					warnOnce( 'WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels.' );
+					dstLevel = srcLevel;
+					srcLevel = 0;
+
+				} else {
+
+					dstLevel = 0;
+
+				}
+
+			}
+
 			// gather the necessary dimensions to copy
 			let width, height, depth, minX, minY, minZ;
 			let dstX, dstY, dstZ;
-			const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[ level ] : srcTexture.image;
+			const image = srcTexture.isCompressedTexture ? srcTexture.mipmaps[ dstLevel ] : srcTexture.image;
 			if ( srcRegion !== null ) {

 				width = srcRegion.max.x - srcRegion.min.x;
@@ -2594,9 +2614,23 @@ class WebGLRenderer {

 			} else {

-				width = image.width;
-				height = image.height;
-				depth = image.depth || 1;
+				const levelScale = Math.pow( 2, - srcLevel );
+				width = Math.floor( image.width * levelScale );
+				height = Math.floor( image.height * levelScale );
+				if ( srcTexture.isDataArrayTexture ) {
+
+					depth = image.depth;
+
+				} else if ( srcTexture.isData3DTexture ) {
+
+					depth = Math.floor( image.depth * levelScale );
+
+				} else {
+
+					depth = 1;
+
+				}
+
 				minX = 0;
 				minY = 0;
 				minZ = 0;
@@ -2659,13 +2693,12 @@ class WebGLRenderer {
 			// set up the src texture
 			const isSrc3D = srcTexture.isDataArrayTexture || srcTexture.isData3DTexture;
 			const isDst3D = dstTexture.isDataArrayTexture || dstTexture.isData3DTexture;
-			if ( srcTexture.isRenderTargetTexture || srcTexture.isDepthTexture ) {
+			if ( srcTexture.isDepthTexture ) {

 				const srcTextureProperties = properties.get( srcTexture );
 				const dstTextureProperties = properties.get( dstTexture );
 				const srcRenderTargetProperties = properties.get( srcTextureProperties.__renderTarget );
 				const dstRenderTargetProperties = properties.get( dstTextureProperties.__renderTarget );
-
 				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, srcRenderTargetProperties.__webglFramebuffer );
 				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, dstRenderTargetProperties.__webglFramebuffer );

@@ -2674,32 +2707,69 @@ class WebGLRenderer {
 					// if the source or destination are a 3d target then a layer needs to be bound
 					if ( isSrc3D ) {

-						_gl.framebufferTextureLayer( _gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get( srcTexture ).__webglTexture, level, minZ + i );
+						_gl.framebufferTextureLayer( _gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get( srcTexture ).__webglTexture, srcLevel, minZ + i );
+						_gl.framebufferTextureLayer( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get( dstTexture ).__webglTexture, dstLevel, dstZ + i );
+
+					}
+
+					_gl.blitFramebuffer( minX, minY, width, height, dstX, dstY, width, height, _gl.DEPTH_BUFFER_BIT, _gl.NEAREST );
+
+				}
+
+				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, null );
+				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, null );
+
+			} else if ( srcLevel !== 0 || srcTexture.isRenderTargetTexture || properties.has( srcTexture ) ) {
+
+				// get the appropriate frame buffers
+				const srcTextureProperties = properties.get( srcTexture );
+				const dstTextureProperties = properties.get( dstTexture );
+
+				// bind the frame buffer targets
+				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, _srcFramebuffer );
+				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, _dstFramebuffer );
+
+				for ( let i = 0; i < depth; i ++ ) {
+
+					// assign the correct layers and mip maps to the frame buffers
+					if ( isSrc3D ) {
+
+						_gl.framebufferTextureLayer( _gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, srcTextureProperties.__webglTexture, srcLevel, minZ + i );
+
+					} else {
+
+						_gl.framebufferTexture2D( _gl.READ_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, srcTextureProperties.__webglTexture, srcLevel );

 					}

-					if ( srcTexture.isDepthTexture ) {
+					if ( isDst3D ) {

-						if ( isDst3D ) {
+						_gl.framebufferTextureLayer( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, dstTextureProperties.__webglTexture, dstLevel, dstZ + i );

-							_gl.framebufferTextureLayer( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, properties.get( dstTexture ).__webglTexture, level, dstZ + i );
+					} else {

-						}
+						_gl.framebufferTexture2D( _gl.DRAW_FRAMEBUFFER, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_2D, dstTextureProperties.__webglTexture, dstLevel );
+
+					}
+
+					// copy the data using the fastest function that can achieve the copy
+					if ( srcLevel !== 0 ) {

-						_gl.blitFramebuffer( minX, minY, width, height, dstX, dstY, width, height, _gl.DEPTH_BUFFER_BIT, _gl.NEAREST );
+						_gl.blitFramebuffer( minX, minY, width, height, dstX, dstY, width, height, _gl.COLOR_BUFFER_BIT, _gl.NEAREST );

 					} else if ( isDst3D ) {

-						_gl.copyTexSubImage3D( glTarget, level, dstX, dstY, dstZ + i, minX, minY, width, height );
+						_gl.copyTexSubImage3D( glTarget, dstLevel, dstX, dstY, dstZ + i, minX, minY, width, height );

 					} else {

-						_gl.copyTexSubImage2D( glTarget, level, dstX, dstY, dstZ + i, minX, minY, width, height );
+						_gl.copyTexSubImage2D( glTarget, dstLevel, dstX, dstY, minX, minY, width, height );

 					}

 				}

+				// unbind read, draw buffers
 				state.bindFramebuffer( _gl.READ_FRAMEBUFFER, null );
 				state.bindFramebuffer( _gl.DRAW_FRAMEBUFFER, null );

@@ -2710,15 +2780,15 @@ class WebGLRenderer {
 					// copy data into the 3d texture
 					if ( srcTexture.isDataTexture || srcTexture.isData3DTexture ) {

-						_gl.texSubImage3D( glTarget, level, dstX, dstY, dstZ, width, height, depth, glFormat, glType, image.data );
+						_gl.texSubImage3D( glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth, glFormat, glType, image.data );

 					} else if ( dstTexture.isCompressedArrayTexture ) {

-						_gl.compressedTexSubImage3D( glTarget, level, dstX, dstY, dstZ, width, height, depth, glFormat, image.data );
+						_gl.compressedTexSubImage3D( glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth, glFormat, image.data );

 					} else {

-						_gl.texSubImage3D( glTarget, level, dstX, dstY, dstZ, width, height, depth, glFormat, glType, image );
+						_gl.texSubImage3D( glTarget, dstLevel, dstX, dstY, dstZ, width, height, depth, glFormat, glType, image );

 					}

@@ -2727,15 +2797,15 @@ class WebGLRenderer {
 					// copy data into the 2d texture
 					if ( srcTexture.isDataTexture ) {

-						_gl.texSubImage2D( _gl.TEXTURE_2D, level, dstX, dstY, width, height, glFormat, glType, image.data );
+						_gl.texSubImage2D( _gl.TEXTURE_2D, dstLevel, dstX, dstY, width, height, glFormat, glType, image.data );

 					} else if ( srcTexture.isCompressedTexture ) {

-						_gl.compressedTexSubImage2D( _gl.TEXTURE_2D, level, dstX, dstY, image.width, image.height, glFormat, image.data );
+						_gl.compressedTexSubImage2D( _gl.TEXTURE_2D, dstLevel, dstX, dstY, image.width, image.height, glFormat, image.data );

 					} else {

-						_gl.texSubImage2D( _gl.TEXTURE_2D, level, dstX, dstY, width, height, glFormat, glType, image );
+						_gl.texSubImage2D( _gl.TEXTURE_2D, dstLevel, dstX, dstY, width, height, glFormat, glType, image );

 					}

@@ -2751,7 +2821,7 @@ class WebGLRenderer {
 			_gl.pixelStorei( _gl.UNPACK_SKIP_IMAGES, currentUnpackSkipImages );

 			// Generate mipmaps only when copying level 0
-			if ( level === 0 && dstTexture.generateMipmaps ) {
+			if ( dstLevel === 0 && dstTexture.generateMipmaps ) {

 				_gl.generateMipmap( glTarget );
`;
