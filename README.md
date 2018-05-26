# DiscordBot
Custom Discord Bot

HowTo:
1) https://nodejs.org/en/
   Download & install Node.js
2) Window+R > cmd
3) npm i npm
4) npm install discord.js winston ytdl-core ffmpeg-binaries node-opus opusscript --save
5) node bot.js


Manual:

   /alive

      봇이 살아있나 체크합니다.
   
   /music {url | fileLocation}

      호출한 사람이 들어가 있는 보이스 채널에, 인자로 받아온 곡을 재생합니다.
      url인 경우 해당 Youtube 주소의 곡을,
      로컬 파일인 경우 봇을 가동중인 서버주의 로컬 파일을 재생합니다.
   
   /stopmusic

      현재 재생중인 음악을 종료하고 보이스 채널에서 봇이 나옵니다.
   
   /roll {option}

      옵션에 따른 주사위를 굴리거나 판정을 합니다.
   
      AdB
   
         B면체 주사위를 A개 굴리고, 모두 더합니다.
      
      AdB+C
   
         B면체 주사위를 A개 굴리고, 보정치 C까지 모두 더합니다. +C 말고 -C를 해도 됩니다.
      
      AdB test D
   
         B면체 주사위를 A개 굴리고, D보다 큰 것의 갯수를 셉니다.
      
      AdB+C test D
   
         B면체 주사위를 A개 굴리고, 각각 보정치 C를 더해준 값이 D보다 큰 것의 갯수를 셉니다. +C 말고 -C를 해도 됩니다.
      
   /start

      이 명령 다음부터 발생하는 대화내역을 모두 기록합니다.
   
   /end

      대화내역 기록을 종료합니다.
   
   /exit

      봇을 종료합니다.
   
