(() => {
  // 1. 위젯에 필요한 모든 CSS를 문자열로 정의합니다.
  const widgetCSS = `
    :root {
      --widget-bg: #0b0f14;
      --widget-card: rgba(255, 255, 255, .08);
      --widget-text: #e9eef6;
      --widget-muted: #a7b0c0;
      --widget-primary: #d04fff;
      --widget-primary-2: #ff6ad0;
      --widget-shadow: 0 10px 30px rgba(0, 0, 0, .45);
    }

    .dimi-faq-widget-container * {
        box-sizing: border-box;
        font-family: "Pretendard", system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, sans-serif;
    }

    .faq-widget-trigger {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--widget-primary), var(--widget-primary-2));
        color: white;
        border-radius: 50%;
        border: none;
        font-size: 28px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--widget-shadow);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow .2s;
    }
    .faq-widget-trigger:hover {
        transform: scale(1.1);
    }

  .faq-widget-trigger.is-open {
      transform: rotate(180deg); 
      border-radius: 20px;
  }

  .chatbotimg {
      width:35px;
}
  .faq-widget-trigger .chatbot-icon,
  .faq-widget-trigger .close-icon {
      position: absolute;
      transition: transform 0.3s, opacity 0.3s;
      font-size: 36px;
      line-height: 1;
  }
  .faq-widget-trigger .chatbot-icon {
      width: 35px;
          height: 35px;
      opacity: 1;
      transform: rotate(0deg) scale(1);
      }
  .faq-widget-trigger .close-icon {
      opacity: 0;
      transform: rotate(-90deg) scale(0.5);
  }
  .faq-widget-trigger.is-open .chatbot-icon {
      opacity: 0;
      transform: rotate(90deg) scale(0.5);
  }
  .faq-widget-trigger.is-open .close-icon {
      opacity: 1;
      transform: rotate(0deg) scale(1);
  }


    .faq-widget-popup {
        position: fixed;
        bottom: 100px;
        right: 25px;
        width: min(400px, 90vw);
        height: min(650px, 80vh);
        z-index: 9999;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--widget-shadow);
        display: none;
        flex-direction: column;
        background: linear-gradient(180deg, var(--widget-card), rgba(255, 255, 255, .06));
        backdrop-filter: saturate(140%) blur(14px);
        border: 1px solid rgba(255,255,255, .15);
        transform-origin: bottom right;
        animation: widget-rise .3s ease-out;
    }
    .faq-widget-popup.open {
        display: flex;
    }

    @keyframes widget-rise {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }

    .faq-widget-popup .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255,255,255, .1);
      flex-shrink: 0;
    }
    .faq-widget-popup .chat-header h1 {
      font-size: 18px;
      margin: 0;
      color: var(--widget-text);
    }
    .faq-widget-popup .chat-header a {
        padding: 6px 10px;
        font-size: 12px;
        background: transparent;
        color: var(--widget-text);
        border: 1px solid rgba(255,255,255, .2);
        text-decoration: none;
        border-radius: 8px;
        font-weight: 500;
    }

    .faq-widget-popup .chat-messages {
      flex-grow: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-widget-popup .message {
      display: flex;
      gap: 10px;
      max-width: 85%;
      animation: message-rise .3s ease-out;
    }
    @keyframes message-rise {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .faq-widget-popup .message.user {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    .faq-widget-popup .message .bubble {
      padding: 10px 14px;
      border-radius: 16px;
      line-height: 1.5;
      font-size: 15px;
      color: var(--widget-text);
    }
    .faq-widget-popup .message.user .bubble {
      background: linear-gradient(135deg, var(--widget-primary), var(--widget-primary-2));
      color: #fff;
      border-radius: 16px 16px 4px 16px;
    }
    .faq-widget-popup .message.bot .bubble {
      background: rgba(0,0,0, .2);
      border-radius: 16px 16px 16px 4px;
    }

    .faq-widget-popup .chat-input-area {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255, .1);
      flex-shrink: 0;
    }
    .faq-widget-popup #chat-form {
      display: flex;
      gap: 10px;
    }
    .faq-widget-popup #user-input {
      flex-grow: 1;
      height: 40px;
      padding: 0 14px;
      border-radius: 10px;
      outline: none;
      color: var(--widget-text);
      font-size: 14px;
      background: rgba(0,0,0,0.2);
      border: 1px solid transparent;
      transition: border-color .2s;
    }
    .faq-widget-popup #user-input:focus {
      border-color: var(--widget-primary);
    }
    .faq-widget-popup .submit-btn {
        appearance: none;
        border: 0;
        cursor: pointer;
        padding: 0 20px;
        border-radius: 10px;
        font-weight: 600;
        background: var(--widget-primary);
        color: #fff;
    }
    .faq-widget-popup .message-suggestions {
        display: flex;
        gap: 8px;
        margin: 8px 0 0 12px;
        flex-wrap: wrap;
    }
    .faq-widget-popup .suggestion-btn {
        border: 1px solid var(--widget-primary);
        background: transparent;
        color: var(--widget-primary);
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 14px;
        cursor: pointer;
    }
  `;

  // 2. 위젯 HTML을 문자열로 정의합니다.
  const widgetHTML = `
    <div class="faq-widget-popup" id="faq-popup">
        <header class="chat-header">
            <h1>DimiCheck FAQ</h1>
            <a href="https://github.com/orgs/DimiCheck/discussions/categories/q-a" target="_blank" rel="noopener noreferrer">문의하기</a>
        </header>
        <div id="chat-messages" class="chat-messages">
            <div class="message bot">
   <div class="bubble">안녕하세요! DimiCheck에 대해 무엇이든 물어보세요.</div>
            </div>
        </div>
        <footer class="chat-input-area">
            <form id="chat-form">
   <input type="text" id="user-input" placeholder="무엇이든 물어보세요..." autocomplete="off" required>
   <button type="submit" class="submit-btn">전송</button>
            </form>
        </footer>
    </div>
    <button class="faq-widget-trigger" id="faq-trigger">         
      <img class="chatbot-icon" src="https://hjun1052.github.io/DimiCheckFAQBot/src/chatbot.png" alt="Chatbot open button">
      <span class="close-icon">&times;</span> 
    </button>   
`;

  // 3. 챗봇 로직을 정의합니다.
  const faqData = [
    {
      id: 'greeting',
      keywords: ['안녕', '하이', 'ㅎㅇ', 'hi', 'hello', '헬로', '반가워', '방가', '올만', '좋은 아침', '굿모닝'],
      response: '안녕하세요 👋 DimiCheck 챗봇입니다! 무엇을 도와드릴까요?'
    },
    {
      id: 'farewell',
      keywords: ['잘가', '빠이', '바이', 'bye', 'ㅃ2', '잘자', '또봐', '수고', '땡큐', '고마워', '감사'],
      response: '대화 즐거웠어요 🙌 도움이 필요하면 언제든 다시 찾아주세요!'
    },
    {
      id: 'attendance',
      keywords: ['출결', '출석', '인증', '체크인', '출결확인', '출석체크', '출결인증', '출결확인'],
      response: 'DimiCheck는 모바일 또는 PC에서 간단히 로그인 후 출결 인증이 가능합니다. 출결 기록은 실시간으로 저장되며, 교사가 바로 확인할 수 있습니다.'
    },
    {
      id: 'status',
      keywords: ['상태', '자리', '자리비움', '자리비웠다', '화장실', '동아리', '외출', '방과후', '프로젝트', '물', '조기입실', '복도', '상태변경', '자리 상태'],
      response: '학생들은 DimiCheck에서 자신의 상태(예: 화장실, 동아리, 외출)를 직접 변경할 수 있고, 교사는 이를 실시간으로 확인할 수 있습니다. 모바일에서는 사이트 접속 후 원하는 상태를 선택하여 완료 버튼을 누르면 되며, 전자칠판에서는 본인 번호의 자석을 끌어다 해당하는 영역에 놓으면 됩니다. 알맞은 영역이 없다면, 기타 영역에 넣은 뒤 사유를 적으면 됩니다. 다시 자리에 돌아왔다면 전자칠판에서 본인 번호의 자석을 원래 위치에 두거나, 사이트에서 현재 선택되어 있는 카드를 클릭하여 선택을 취소하면 됩니다.'
    },
    {
      id: 'login',
      keywords: ['로그인', '로그온', '계정', '디풀', 'dipull', '디폴', '회원가입', '회원 가입', '접속', '로그', '아이디', '비밀번호', 'ID', '패스워드', '비번', '찾기', '재설정'],
      response: '로그인은 디미고 통합 인증 시스템인 디풀 계정으로 진행됩니다. 별도의 회원가입은 필요 없으며, 학생/교사 모두 같은 로그인 페이지를 이용합니다. 디풀 로그인 중 발생한 문제는 디풀 측에 연락하시기 바랍니다.'
    },
    {
      id: 'teacher',
      keywords: ['선생님', '교사', '관리자', '담임', '관리'],
      response: '교사는 관리자 페이지를 통해 학생들의 출결 현황과 상태를 한눈에 확인할 수 있습니다. 디풀 계정으로 로그인 시 자동으로 교사용 페이지로 연결됩니다.'
    },
    {
      id: 'student',
      keywords: ['학생', '내정보', '내 출결', '학생용', '출결확인', '내 상태', '학생페이지'],
      response: '학생은 로그인 후 본인의 출결 기록과 상태를 확인할 수 있습니다. 또, 상태(예: 자리비움, 동아리)를 직접 수정할 수 있습니다.'
    },
    {
      id: 'timetable',
      keywords: ['시간표', '수업', '교시', '수업시간', '급식', '급식 메뉴', '밥', '아침', '점심', '저녁', '조식', '중식', '석식'],
      response: '시간표 기능과 급식 보기 기능은 현재 전자칠판의 우측 하단 i 버튼을 통해 확인하실 수 있습니다. 모바일용은 열심히 개발 중이에요.'
    },
    {
      id: 'error',
      keywords: ['안돼', '에러', '문제', '오류', '버그', '안됨', '작동 안함', '깨짐', '멈춤'],
      response: '이용 중 문제가 발생했나요? 😥 잠시 후 다시 시도해보시고, 지속된다면 담당 교사나 개발팀에 문의해주세요.'
    },
    {
      id: 'home',
      keywords: ['집'],
      response: '집에 가고 싶나요? 이걸 만든 개발자도 그렇답니다 😥 일찍 집에 갈 때는 결석(조퇴) 영역으로 두면 돼요.'
    },
    {
      id: 'help',
      keywords: ['뭐해', '뭐 할 수 있어', '뭘', '할 줄 아는거', '도움말', '사용법', '뭘 해', '넌 뭐야'],
      response: `저는 DimiCheck 챗봇이에요 🤖. 제가 도와드릴 수 있는 건:\n      출결 인증 방법 안내, \n      상태 변경(화장실, 동아리 등) 설명, \n      로그인/비밀번호 문제 안내, \n      교사용, 학생용 페이지 차이 안내, \n      오류/문제 발생 시 대처법 안내, \n      개발팀 문의 방법 안내 와 같아요. \n\n      궁금한 키워드를 입력하면 바로 알려드려요!`
    },
    {
      id: 'dumb',
      keywords: ['바보', '무식', '어쩌', '멍청', '쓰레기'],
      response: '도움을 드리지 못해 죄송해요. 문의하기를 통해 보다 정확한 답변을 받을 수 있으니 참고하세요.'
    },
    {
      id: 'etc',
      keywords: ['기타', '문의', '질문', '모름', '뭐야', '뭐임', '설명', '도움'],
      response: '궁금한 점이 더 있으시면, 개발팀에 문의하거나 문의하기 버튼을 눌러주세요.'
    }
  ];

  // 4. 위젯을 초기화하고 페이지에 삽입하는 함수입니다.
  function initDimiFAQWidget() {
    // CSS 주입
    const styleSheet = document.createElement("style");
    styleSheet.innerText = widgetCSS;
    document.head.appendChild(styleSheet);

    // HTML 주입
    const widgetContainer = document.createElement("div");
    widgetContainer.className = 'dimi-faq-widget-container';
    widgetContainer.innerHTML = widgetHTML;
    // document.body.appendChild(widgetContainer);

    widgetContainer.style.position = 'fixed';
    widgetContainer.style.top = '0';
    widgetContainer.style.left = '0';
    widgetContainer.style.width = '0';
    widgetContainer.style.height = '0';
    widgetContainer.style.zIndex = '9997';

    document.body.appendChild(widgetContainer);

    // 위젯 요소 및 이벤트 리스너 설정
    const trigger = document.getElementById('faq-trigger');
    const popup = document.getElementById('faq-popup');
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    trigger.addEventListener('click', () => {
      const isOpen = popup.classList.toggle('open');
      trigger.classList.toggle('is-open', isOpen);
    });
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = userInput.value.trim();
      if (userMessage === '') return;
      appendMessage(userMessage, 'user');
      userInput.value = '';
      userInput.focus();
      userInput.disabled = true;
      chatForm.querySelector('button').disabled = true;

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        appendMessage(botResponse.response, 'bot', botResponse.suggestions);
        userInput.disabled = false;
        chatForm.querySelector('button').disabled = false;
      }, 500);
    });

    function appendMessage(text, sender, suggestions = []) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', sender);
      const bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('bubble');
      bubbleDiv.textContent = text;
      messageDiv.appendChild(bubbleDiv);
      chatMessages.appendChild(messageDiv);

      if (suggestions.length > 0) {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'message-suggestions';
        suggestions.forEach(suggestionText => {
          const button = document.createElement('button');
          button.className = 'suggestion-btn';
          button.textContent = suggestionText;
          button.onclick = () => {
            userInput.value = suggestionText;
            chatForm.dispatchEvent(new Event('submit', { bubbles: true }));
          };
          suggestionsContainer.appendChild(button);
        });
        chatMessages.appendChild(suggestionsContainer);
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
      const normalizedUserMessage = userMessage.replace(/[\s\.,\?!~\/]/g, '');
      let matchedResponses = [];
      faqData.forEach(item => {
        const hasKeyword = item.keywords.some(keyword => normalizedUserMessage.includes(keyword));
        if (hasKeyword) matchedResponses.push(item.response);
      });

      if (matchedResponses.length > 0) {
        return { response: matchedResponses.join('\n\n—\n\n'), suggestions: [] };
      } else {
        return {
          response: "죄송해요, 잘 이해하지 못했어요. 아래의 키워드로 다시 질문해주시겠어요?",
          suggestions: ['도움말', '출결 인증', '로그인 방법', '상태 변경', '선생님']
        };
      }
    }
  }

  // 페이지 로드 시 위젯 초기화 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDimiFAQWidget);
  } else {
    initDimiFAQWidget();
  }
})();
