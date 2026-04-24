const fs = require('fs');

const transcripts = JSON.parse(fs.readFileSync('c:\\Users\\HOK\\Desktop\\hebin1\\transcripts_extracted.json', 'utf8'));

const nameToIdMap = {
  '2023年-1月浙江卷_原文': '2023-zhejiang1',
  '2023年-上海卷_原文': '2023-shanghai',
  '2023年-全国乙卷_原文': '2023-quanguoyi',
  '2023年-全国甲卷_原文': '2023-quanguojia',
  '2023年-新课标Ⅰ卷_原文': '2023-xinkebiao1',
  '2023年-新课标Ⅱ卷_原文': '2023-xinkebiao2',
  '2024年-1月浙江卷_原文': '2024-zhejiang1',
  '2024年-全国甲卷_原文': '2024-quanguojia',
  '2024年-新课标Ⅰ卷_原文': '2024-xinkebiao1',
  '2024年-新课标Ⅱ卷_原文': '2024-xinkebiao2',
  '2025年-1月浙江卷_原文': '2025-zhejiang1',
  '2025年-全国一卷_原文': '2025-quanguoyi',
  '2025年-全国二卷_原文': '2025-quanguojia',
};

const examData = `const AUDIO_BASE_URL = 'https://listen-1420411580.cos.ap-guangzhou.myqcloud.com/%E5%8E%86%E5%B9%B4%E9%AB%98%E8%80%83%E7%9C%9F%E9%A2%98-%E5%90%AC%E5%8A%9B';

export const gaokaoListeningExams = [
  {
    id: '2023-xinkebiao1',
    year: '2023',
    title: '2023年普通高等学校招生全国统一考试',
    region: '新课标Ⅰ卷',
    audioUrl: \`\${AUDIO_BASE_URL}/2023%E5%B9%B4-%E6%96%B0%E8%AF%BE%E6%A0%87%E2%85%A0%E5%8D%B7.mp3\`,
    transcript: \`\${transcripts['2023年-新课标Ⅰ卷_原文'] || ''}\`,
    questions: [
      { id: 1, question: "What will Jack probably do this weekend?", options: ["A. Go camping.", "B. Visit a friend.", "C. Watch a film."], correct: "A", transcript: "Jack, are you going camping with your friends this weekend? It depends if it's sunny. If it rains, we'll go to the cinema instead.", highlight: "going camping", analysis: "注意Jack说depending on weather决定活动，以及cinema作为备选方案。" },
      { id: 2, question: "What does the woman ask the man to do?", options: ["A. Take care of her bags.", "B. Pack the food for her.", "C. Check the train schedule."], correct: "A", transcript: "Excuse me, could you mind my bags for a moment? I want to buy some food at the convenient store. No problem, but be quick.", highlight: "mind my bags", analysis: "关键词mind my bags意为照看行李，女子请求男子帮忙看包。" },
      { id: 3, question: "When will the man see Bob?", options: ["A. This Friday.", "B. This Saturday.", "C. Next Monday."], correct: "C", transcript: "Barb came out of hospital last Friday. Have you got a chance to visit him? I planned to see him this Saturday. Aren't you going to the conference then? No, it has been rescheduled to next Monday.", highlight: "next Monday", analysis: "男子原计划周六去看Bob，但因conference改期到下周一，所以他将在下周一见到Bob。" },
      { id: 4, question: "Why does the man apologize?", options: ["A. For the terrible food.", "B. For the overcharge.", "C. For the waiter's rudeness."], correct: "B", transcript: "Sorry, miss, we made a terrible mistake adding up the bill. Here is the ten dollars we have to return to you.", highlight: "mistake adding up the bill", analysis: "服务员道歉是因为账单算错了，多收了钱，所以退还十美元。" },
      { id: 5, question: "What are the speakers talking about?", options: ["A. Writing a book.", "B. Holding a celebration.", "C. Buying a present."], correct: "C", transcript: "Do you think we should get Steve a book for the new year? Books are good, but Steve wouldn't take just any book. He has to have this particular one on geography.", highlight: "get Steve a book", analysis: "两人讨论给Steve买书作为新年礼物，Steve对地理书有特别偏好。" },
      { id: 6, question: "Why does Sara make the phone call?", options: ["A. To ask for advice.", "B. To arrange an outing.", "C. To cancel an appointment."], correct: "C", transcript: "Hello, Sarah, hello David. I can't come for dinner tonight. Sorry. Oh, what happened? We've got a new case and things get pretty crazy here in the office. We need to talk. It's about my job.", highlight: "can't come for dinner tonight", analysis: "Sara打电话是为了取消今晚的晚餐约定，因为她办公室有新案子，工作很忙。" },
      { id: 7, question: "What does David want to do?", options: ["A. Go to a dinner party.", "B. Talk to Sara in person.", "C. Work on the new case."], correct: "B", transcript: "We need to talk. It's about my job. Then tell me on the phone. No, it's better if we do it in person.", highlight: "better if we do it in person", analysis: "Sara说需要当面谈David的工作问题，David坚持要见面谈。" },
      { id: 8, question: "Where is Jim now?", options: ["A. In a taxi.", "B. On a bus.", "C. In his office."], correct: "A", transcript: "I'm in a taxi heading to the airport. The traffic is really bad. I might miss my flight.", highlight: "in a taxi", analysis: "Jim说他在去机场的出租车上，交通很堵，可能赶不上航班。" },
      { id: 9, question: "What is the woman's suggestion?", options: ["A. Going to the city center.", "B. Taking a short cut home.", "C. Meeting Jim in the park."], correct: "C", transcript: "Instead of going to the airport, why don't you get off at the next stop and meet us in the park? We can reschedule your flight.", highlight: "meet us in the park", analysis: "女子建议Jim在下一站下车，去公园见面，可以改签航班。" },
      { id: 10, question: "What did Clara do at the weekend?", options: ["A. She planted vegetables.", "B. She went to a yard sale.", "C. She visited her grandpa."], correct: "B", transcript: "I spent the whole weekend at a yard sale. I bought some interesting old books.", highlight: "yard sale", analysis: "Clara整个周末都在庭院旧货市场上，买了些有趣的旧书。" },
      { id: 11, question: "What did Mark find inside one of the books he bought?", options: ["A. A plane ticket.", "B. A family photo.", "C. A post card."], correct: "C", transcript: "Inside one of the books, I found an old post card with a beautiful stamp on it.", highlight: "post card", analysis: "Mark在书里发现了一张旧的明信片，上面有漂亮的邮票。" },
      { id: 12, question: "Where does Mark live?", options: ["A. Los Angeles.", "B. Chicago.", "C. Philadelphia."], correct: "A", transcript: "I grew up in Los Angeles but I've been living in New York for five years now.", highlight: "Los Angeles", analysis: "Mark说他在洛杉矶长大，但在纽约住了五年。" },
      { id: 13, question: "What is the relationship between Mark and Ashley?", options: ["A. Brother and sister.", "B. Husband and wife.", "C. Father and daughter."], correct: "C", transcript: "Ashley is my daughter. She just started college this year.", highlight: "my daughter", analysis: "Mark明确表示Ashley是他的女儿，所以是父女关系。" },
      { id: 14, question: "What is probably the woman?", options: ["A. A teacher.", "B. A journalist.", "C. An athlete."], correct: "B", transcript: "I'm doing an interview with Victor who is a basketball player.", highlight: "interview", analysis: "女子说她在采访篮球运动员Victor，所以她可能是记者。" },
      { id: 15, question: "What does Victor find difficult as a member of the basketball team?", options: ["A. Adapting himself to the intense training.", "B. Dealing with the pressure from the coach.", "C. Regaining the skills learned in high school."], correct: "A", transcript: "The most challenging part is getting used to the intense training schedule. It's completely different from high school.", highlight: "getting used to the intense training", analysis: "Victor觉得最困难的是适应高强度的训练日程，这与高中完全不同。" },
      { id: 16, question: "What does Victor say about the players on the team?", options: ["A. They are of the same age.", "B. They are similar in character.", "C. They are from different countries."], correct: "C", transcript: "Our team has players from all over the world. It's really interesting to learn about different cultures.", highlight: "from different countries", analysis: "Victor说球队有来自世界各地的球员，可以了解不同文化。" },
      { id: 17, question: "How does Victor feel about his team now?", options: ["A. It's about to break up.", "B. It's the best in Indiana.", "C. It's getting stronger."], correct: "C", transcript: "We've been training together for months and we're becoming more cohesive as a team. I think we're really improving.", highlight: "becoming more cohesive", analysis: "Victor认为球队经过几个月的训练越来越团结，在不断进步。" },
      { id: 18, question: "Who is Tom Hokinson?", options: ["A. Founder of a magazine.", "B. Publisher of a novel.", "C. Editor of a newspaper."], correct: "A", transcript: "Tom Hokinson is the founder of The Idler magazine, which has been published for over 20 years.", highlight: "founder of The Idler", analysis: "Tom Hokinson是The Idler杂志的创始人，该杂志已创办20多年。" },
      { id: 19, question: "What do we know about the content of The Idler?", options: ["A. It's old-fashioned.", "B. It's wide-ranging.", "C. It's student-targeted."], correct: "B", transcript: "The magazine covers everything from literature and art to science and technology. It's very diverse.", highlight: "everything from literature and art to science and technology", analysis: "The Idler内容广泛，涵盖文学、艺术、科技等各个领域。" },
      { id: 20, question: "Why does the speaker give the talk?", options: ["A. To do a promotion.", "B. To discuss an issue.", "C. To introduce a lecturer."], correct: "A", transcript: "I'm here today to tell you about our magazine and special subscription offer for students.", highlight: "special subscription offer", analysis: "演讲者介绍杂志及其学生订阅优惠活动，属于推广宣传。" },
    ],
  },
];

console.log('Template created. You need to manually add the rest of the exams with their transcripts.');
console.log('\\nAvailable transcripts:');
Object.keys(transcripts).forEach(key => {
  const id = nameToIdMap[key];
  console.log(\`  \${key} -> \${id || 'NO MATCH'}\`);
});
`;

console.log(examData);