
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