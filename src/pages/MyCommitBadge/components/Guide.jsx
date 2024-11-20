import CheckCircleIcon from "../../../shared/components/CheckCircleIcon";
import PlusMinusIcon from "../../../shared/components/PlusMinusIcon";

const Guide = () => {
  return (
    <div className="px-32">
      <div className="space-y-12">
        <section>
          <h3 className="text-sm/7 font-semibold text-slate-400">FAQ</h3>
          <dl className="mt-2 divide-y divide-slate-100">
            <details className="group py-4 marker:content-['']">
              <summary className="[&amp;::-webkit-details-marker]:hidden flex cursor-pointer select-none justify-between font-semibold text-slate-900 group-open:text-blue-500">
                입력 가능한 레포지토리 커밋 메시지 형식은 어떻게 되나요?
                <PlusMinusIcon />
              </summary>
              <div className="pb-4 pt-4">
                <div className="text-base">
                  <span>
                    *대소문자 구분이 없습니다. (Case-insensitive)
                    <p className="mt-2">
                      <strong>1. 프리 픽스 스타일 (Prefix Style)</strong>
                    </p>
                    <code className="font-medium">type(scope): subject</code>
                    <p className="font-medium">
                      예시: feat(auth): 로그인 API 연동
                    </p>
                    <p className="mt-2">
                      <strong>2. 일반 텍스트 스타일 (Simple Text Style)</strong>
                    </p>
                    <code className="font-medium">type subject</code>
                    <p className="font-medium">예시: Add 로그인 API 연동</p>
                    <p className="mt-2">
                      <strong>
                        3. 템플릿 기반 스타일 (Template Based Style)
                      </strong>
                    </p>
                    <code className="font-medium">[type] subject</code>
                    <p className="font-medium">예시: [ADD] 로그인 API 연동</p>
                  </span>
                </div>
              </div>
            </details>
            <details className="group py-4 marker:content-['']">
              <summary className="[&amp;::-webkit-details-marker]:hidden flex cursor-pointer select-none justify-between font-semibold text-slate-900 group-open:text-blue-500">
                Commit Guardians가 확인하는 커밋 타입과 채점 방식은 무엇인가요?
                <PlusMinusIcon />
              </summary>
              <div className="flex overflow-auto">
                <div className="h-[420px]">
                  <div className="pb-4 pt-4">
                    <div className="flex flex-row items-center">
                      <CheckCircleIcon />
                      <strong className="ml-1">remove</strong>
                    </div>
                    <ul className="mb-2 list-disc ps-5 dark:text-gray-400">
                      <li>파일 및 폴더, 코드를 삭제한 커밋</li>
                      <li className="mb-2">
                        - 변경사항에 삭제한 부분만 포함됐는지 확인
                      </li>
                      <li>해당하지 않는 경우 예시</li>
                      <li>- 파일 삭제와 코드 수정을 같이 커밋했을 경우</li>
                      <li>- 변경사항에 코드의 추가된 부분이 포함된 경우</li>
                    </ul>
                  </div>
                  <div className="pb-4 pt-4">
                    <div className="flex flex-row items-center">
                      <CheckCircleIcon />
                      <strong className="ml-1">docs</strong>
                    </div>
                    <ul className="mb-2 list-disc ps-5 dark:text-gray-400">
                      <li>문서 작업만을 한 커밋</li>
                      <li>- 문서에 사용되는 파일만 포함됐는지 확인</li>
                      <li className="ps-5">
                        - 이미지 파일 - .img, .png, .jpeg, .svg, .ai
                      </li>
                      <li className="mb-2 ps-5">
                        - 기타 문서 파일 - .pdf ,.docs, .md, .mdx, .rst
                      </li>
                      <li>해당하지 않는 경우 예시</li>
                      <li className="ps-2">
                        - 문서 파일과 소스 코드 파일의 수정사항을 같이 커밋했을
                        경우
                      </li>
                    </ul>
                  </div>
                  <div className="pb-4 pt-4">
                    <div className="flex flex-row items-center">
                      <CheckCircleIcon />
                      <strong className="ml-1">style</strong>
                    </div>
                    <ul className="mb-2 list-disc ps-5 dark:text-gray-400">
                      <li>
                        주로 코드 포매팅, 들여 쓰기, 코드 정렬 등 코드의 동작에
                        영향을 주지 않는 수정을 한 커밋
                      </li>
                      <li>
                        - 파일명에 style을 나타내는 단어 확인
                        (&quot;prettier&quot;, &quot;eslint&quot;,
                        &quot;config”)
                      </li>
                      <li>
                        - 변경사항에 특수문자(, &apos; &quot; \n ; 등)만
                        수정됐는지 확인
                      </li>
                      <li>- 변경사항이 console.log 와 관련됐는지 확인</li>
                      <li>- 요소들의 위치 변경 확인</li>
                      <li className="ps-5">- tailwind className의 속성 순서</li>
                      <li className="mb-2 ps-5">- 객체 속성들의 순서</li>
                      <li>해당하지 않는 경우 예시</li>
                      <li className="ps-5">
                        - 변수명 변경 등 style 체크 사항에 벗어난 경우
                      </li>
                    </ul>
                  </div>
                  <div className="pb-4 pt-4">
                    <div className="flex flex-row items-center">
                      <CheckCircleIcon />
                      <strong className="ml-1">test</strong>
                    </div>
                    <ul className="mb-2 list-disc ps-5 dark:text-gray-400">
                      <li>- 테스트를 추가하거나 변경한 커밋</li>
                      <li className="ps-5">
                        - 테스트 코드를 작성한 파일만 포함됐는지 확인
                      </li>
                      <li className="ps-8">- test, tests, spec, mock</li>
                      <li>- 해당하지 않는 경우 예시</li>
                      <li className="ps-5">
                        - test 검증 키워드가 파일명에 없거나 끝에 위치하지 않은
                        경우
                      </li>
                      <li className="ps-8">
                        <code>a/src/compiler-worker.ts</code>
                      </li>
                      <li className="ps-8">
                        <code>a/mock_feed_repository_impl.dart</code>
                      </li>
                      <li className="ps-5">
                        - 테스트 코드 관련 파일이 아닌 설정 파일 등의 수정사항을
                        같이 커밋했을 경우
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </details>
          </dl>
        </section>
        <section className="absolute bottom-52 m-1 text-sm text-slate-600">
          <p>If you have an idea for a commitguardians</p>
          <p>please email commitguardians@google.com!</p>
        </section>
      </div>
    </div>
  );
};

export default Guide;
