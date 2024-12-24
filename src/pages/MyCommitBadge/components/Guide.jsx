import CommitTypeValue from "../../../features/commit/components/CommitTypeValue";
import Accordion from "../../../shared/components/Accordion";

function Guide() {
  return (
    <div className="px-12">
      <Accordion
        category="FAQ"
        title="입력 가능한 레포지토리 커밋 메시지 형식은 어떻게 되나요?"
      >
        <div className="pb-4 pt-4 text-slate-700 dark:text-slate-400">
          <div className="text-base">
            <span>
              <p className="text-xs">
                * 대소문자를 구분하지 않습니다. (Case-insensitive)
              </p>
              <p className="mt-2">
                <strong>1. 프리 픽스 스타일 (Prefix Style)</strong>
              </p>
              <code className="font-medium">type(scope): subject</code>
              <p className="font-medium">예시: feat(auth): 로그인 API 연동</p>
              <p className="mt-2">
                <strong>2. 일반 텍스트 스타일 (Simple Text Style)</strong>
              </p>
              <code className="font-medium">type subject</code>
              <p className="font-medium">예시: Add 로그인 API 연동</p>
              <p className="mt-2">
                <strong>3. 템플릿 기반 스타일 (Template Based Style)</strong>
              </p>
              <code className="font-medium">[type] subject</code>
              <p className="font-medium">예시: [ADD] 로그인 API 연동</p>
            </span>
          </div>
        </div>
      </Accordion>
      <Accordion title="Commit Guardians가 확인하는 커밋 타입과 채점 방식은 무엇인가요?">
        <div className="flex overflow-auto text-slate-700 dark:text-slate-400">
          <div className="h-[420px]">
            <div className="pb-4 pt-4">
              <div className="mb-2 flex flex-row items-center">
                <CommitTypeValue type="remove" />
              </div>
              <ul className="mb-2 list-disc ps-5">
                <li>
                  파일 및 폴더, 코드를 <b>삭제한 커밋</b>
                </li>
                <p className="mb-2">
                  - 변경사항에 삭제한 부분만 포함됐는지 확인
                </p>
                <li>해당하지 않는 경우 예시</li>
                <p>- 파일 삭제와 코드 수정을 같이 커밋했을 경우</p>
                <p>- 변경사항에 코드의 추가된 부분이 포함된 경우</p>
              </ul>
            </div>
            <div className="pb-4 pt-4">
              <div className="mb-2 flex flex-row items-center">
                <CommitTypeValue type="docs" />
              </div>
              <ul className="mb-2 list-disc ps-5">
                <li>
                  <b>문서 작업만</b>을 한 커밋
                </li>
                <p>- 문서에 사용되는 파일만 포함됐는지 확인</p>
                <li className="list-inside ps-5">
                  이미지 파일 - .img, .png, .jpeg, .svg, .ai
                </li>
                <li className="mb-2 list-inside ps-5">
                  기타 문서 파일 - .pdf, .docs, .md, .mdx, .rst
                </li>
                <li>해당하지 않는 경우 예시</li>
                <p>
                  - 문서 파일과 소스 코드 파일의 수정사항을 같이 커밋했을 경우
                </p>
              </ul>
            </div>
            <div className="pb-4 pt-4">
              <div className="mb-2 flex flex-row items-center">
                <CommitTypeValue type="style" />
              </div>
              <ul className="mb-2 list-disc ps-5">
                <li>
                  주로 코드 포매팅, 들여 쓰기, 코드 정렬 등
                  <b className="pl-1">코드의 동작에 영향을 주지 않는</b> 수정을
                  한 커밋
                </li>
                <p>
                  - 파일명에 style을 나타내는 단어 확인 (&quot;prettier&quot;,
                  &quot;eslint&quot;, &quot;config”)
                </p>
                <p>
                  - 변경사항에 특수문자(, &apos; &quot; \n ; 등)만 수정됐는지
                  확인
                </p>
                <p>- 변경사항이 console.log 와 관련됐는지 확인</p>
                <p>- 요소들의 위치 변경 확인</p>
                <li className="list-inside ps-5">
                  tailwind className의 속성 순서
                </li>
                <li className="mb-2 list-inside ps-5">객체 속성들의 순서</li>
                <li>해당하지 않는 경우 예시</li>
                <p>- 변수명 변경 등 style 체크 사항에 벗어난 경우</p>
              </ul>
            </div>
            <div className="pb-4 pt-4">
              <div className="mb-2 flex flex-row items-center">
                <CommitTypeValue type="test" />
              </div>
              <ul className="mb-2 list-disc ps-5">
                <li>
                  <b>테스트를 추가하거나 변경한 커밋</b>
                </li>
                <p>- 테스트 코드를 작성한 파일만 포함됐는지 확인</p>
                <li className="mb-2 list-inside ps-5">
                  test, tests, spec, mock
                </li>
                <li>해당하지 않는 경우 예시</li>
                <p>
                  - test 검증 키워드가 파일명에 없거나 끝에 위치하지 않은 경우
                </p>
                <code className="block ps-5">a/src/compiler-worker.ts</code>
                <code className="block ps-5">
                  a/mock_feed_repository_impl.dart
                </code>
                <p>
                  - 테스트 코드 관련 파일이 아닌 설정 파일 등의 수정사항을 같이
                  커밋했을 경우
                </p>
              </ul>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  );
}

export default Guide;
