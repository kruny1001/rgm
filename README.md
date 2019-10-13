
gsutil cors get dershare-db

gsutil cors set cors.json gs://dershare-db

알부화시키기 
동작가르치기

카드 인식으로 로봇이 고개를 움직이면서 방향을 학습하면 학습한 방향의 버튼에 불이 켜지는 게임
본게임 내용
제어앱에서 CmdCode [start / 0105001] 받으면 시작
게임 시작 화면. 시작버튼 누르면 게임 시작함(2인모드 따로 없음)
처음의 버튼 4개는 btn1_left,right,up,down. 눌리지 않음. 오른쪽 하단에는 piohead1_normal

피오 로봇이 카드를 인식하여 고개를 CmdCode 
[3003 - left/right/up/down]로 돌릴 때마다  보조앱에서 btn1_left,right,up,down > btn2_left,right,up,down로 바뀜 + sound_dingdong + piohead2_smile > [피오: 아하! + 볼 LED 흰색 깜빡]
한번 더 피오 로봇이 카드를 인식하여 고개를 CmdCode 
[3003 -  left/right/up/down] 로 돌릴 때마다 보조앱에서  btn2_left,right,up,down > btn3_left,right,up,down로 바뀜 + sound_done + piohead2_smile > [피오: 왼쪽/오른쪽/위/아래! + 볼 LED 흰색 깜빡]

모든 버튼이 btn3으로 바뀌면 CmdCode 
[ 동작가르치기 / act]버튼 중앙에 자막: 학습 완료! + piohead3_done + [피오: 모든 동작을 배웠어요!+motion_exciting]

버튼을 누르면  CmdCode(robot, left/right/up/down) btn3 > btn3_click + 피오 로봇: 누른 버튼의 방향으로 머리 움직이며 그 방향을 말함 > btn3_click>btn3
제어앱에서 CmdCode [ stop ]하면 대기화면


스트레칭가르치기
[5회기] <스트레칭 가르치기>
*기획서 내용에서 조금 변경되었습니다.(영상 빠지고 버튼만 나오게) 업로드해둔 ‘스트레칭 가르치기_스토리보드’ pdf 파일을 참고해주시길 바랍니다.
본게임 내용
제어앱에서 CmdCode [start / 스트레칭 가르치기 / 0105002] 받으면 시작
게임 시작 화면. 시작버튼 누르면 게임 시작함(2인모드 따로 없음) 
화면엔 btn_right/left/up/down 뜸[3014] > btn 중앙의 자막: 준비~ 시작! + 피오보조앱 음성: “준비, 시작!”
 음성 지시[5020] >
버튼을 누르면CmdCode(robot, left/right/up/down) btn_click + sound_correct[3907] + piohead2_smile + 피오 해당 방향으로 움직임 > btn_click>btn
CmdCode [3001, fin]]자막: 스트레칭 끝! + 피오: “스트레칭 끝!”
image_guide 뜸[0105003] +  [보조앱 음성: “아이, 시원하다! 운동시켜주셔서 감사해요!” + motion_happy]
제어앱에서 CmdCode [ stop ]하면 대기화면


알 부화시키기 - 개인
제어앱에서 CmdCode [start / 알 부화시키기_개인 / 0101001] 받으면 시작
*색깔 순서: White → Red → Blue → Orange → Green → Purple → Rainbow
image_eggWhite 등장 + 자막: 알을 흔들어주세요.  
> 참가자: 알을 흔든다.
>흔들림이 1회 인식될 때마다 sound_ding + sprite_eggColorLight
>알을 n회 흔들면 sprite_ColorChange(색깔이 변함) + sound_start
> 색깔이 다 변하고 나면 자막:색깔이 변했어요! + 나레이션
sound_colorchange가 끝나고 5초가 지난 뒤 자막: 알을 계속 흔들어주세요.
마지막 색깔 변화인 sprite_ColorChange6_P-R가 끝나고 나면 sprite_twinke + sound_twinkle
> 자막: 생명 에너지가 전해졌어요! + 나레이션
>제어앱에서 CmdCode [ stop ]해야 종료됨

알 부화시키기 - 협동
제어앱에서 CmdCode [start / 알 부화시키기_협동 / 0101002] 받으면 시작
*색깔 순서: White → Red → Blue → Orange → Green → Purple → Rainbow
eggwhite 등장 + 자막: 알을 흔들어주세요.  
> 참가자: 알을 흔든다.
>흔들림이 1회 인식될 때마다 sound_ding[3901] + sprite_eggColorLight
>알을 n회 흔들면 sprite_ColorChange(색깔이 변함) + sound_start[3909]
> 색깔이 다 변하고 나면 자막:색깔이 변했어요. 짝꿍에게 넘겨주세요! + 나레이션
sound_colorchange가 끝나고 5초가 지난 뒤 자막: 알을 계속 흔들어주세요.
마지막 색깔 변화인 sprite_ColorChange6_P-R가 끝나고 나면 sprite_twinke + sound_twinkle[3902]
> 자막: 생명 에너지가 전해졌어요! + 나레이션
>제어앱에서 CmdCode [ stop ]해야 종료됨