// ── Question bank ─────────────────────────────────────────────────────
    const TOPICS = {
      'General knowledge': { icon: 'ti-bulb', questions: [
        { q: 'What is the capital of Australia?', options: ['Sydney','Melbourne','Canberra','Brisbane'], answer: 2, exp: 'Canberra, not Sydney, is Australia\'s capital.' },
        { q: 'How many sides does a hexagon have?', options: ['5','6','7','8'], answer: 1, exp: 'Hexa means six in Greek.' },
        { q: 'Which planet is closest to the Sun?', options: ['Venus','Earth','Mars','Mercury'], answer: 3, exp: 'Mercury is the innermost planet.' },
        { q: 'What is the largest ocean on Earth?', options: ['Atlantic','Indian','Arctic','Pacific'], answer: 3, exp: 'The Pacific Ocean covers more than 30% of Earth\'s surface.' },
        { q: 'Who painted the Mona Lisa?', options: ['Michelangelo','Raphael','Leonardo da Vinci','Caravaggio'], answer: 2, exp: 'Leonardo da Vinci painted it around 1503–1519.' },
        { q: 'How many bones are in the adult human body?', options: ['196','206','216','226'], answer: 1, exp: 'Adults have 206 bones; babies start with around 270.' },
        { q: 'What is the chemical symbol for gold?', options: ['Go','Gd','Au','Ag'], answer: 2, exp: 'Au comes from the Latin word aurum.' },
        { q: 'Which country invented pizza?', options: ['Greece','USA','France','Italy'], answer: 3, exp: 'Pizza originated in Naples, Italy in the 18th century.' },
        { q: 'What is the smallest prime number?', options: ['0','1','2','3'], answer: 2, exp: '2 is the smallest and only even prime number.' },
        { q: 'How many continents are there on Earth?', options: ['5','6','7','8'], answer: 2, exp: 'Earth has 7 continents.' }
      ]},
      'Science': { icon: 'ti-atom', questions: [
        { q: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen','Nitrogen','Carbon dioxide','Hydrogen'], answer: 2, exp: 'Plants absorb CO₂ for photosynthesis.' },
        { q: 'What is the speed of light (approx)?', options: ['300,000 km/s','150,000 km/s','30,000 km/s','3,000 km/s'], answer: 0, exp: 'Light travels at ~299,792 km/s in a vacuum.' },
        { q: 'What is H₂O?', options: ['Hydrogen peroxide','Salt water','Water','Hydrochloric acid'], answer: 2, exp: 'H₂O is the chemical formula for water.' },
        { q: 'Which organ pumps blood through the body?', options: ['Liver','Kidney','Lung','Heart'], answer: 3, exp: 'The heart is a muscular pump.' },
        { q: 'DNA stands for?', options: ['Deoxyribonucleic acid','Dinitrogen acid','Dipeptide nucleic acid','Deoxyribose nitrogen acid'], answer: 0, exp: 'DNA = Deoxyribonucleic acid.' },
        { q: 'What force keeps us on Earth?', options: ['Magnetism','Friction','Gravity','Inertia'], answer: 2, exp: 'Gravity pulls objects toward Earth\'s centre.' },
        { q: 'How many chromosomes does a human cell have?', options: ['23','44','46','48'], answer: 2, exp: 'Humans have 46 chromosomes (23 pairs).' },
        { q: 'What is the powerhouse of the cell?', options: ['Nucleus','Ribosome','Mitochondria','Golgi body'], answer: 2, exp: 'Mitochondria produce ATP energy.' },
        { q: 'Which planet has the most moons?', options: ['Jupiter','Saturn','Uranus','Neptune'], answer: 1, exp: 'Saturn has over 140 known moons as of 2023.' },
        { q: 'What is the boiling point of water at sea level?', options: ['90°C','95°C','100°C','105°C'], answer: 2, exp: 'Water boils at 100°C (212°F) at standard pressure.' }
      ]},
      'Technology': { icon: 'ti-cpu', questions: [
        { q: 'What does CPU stand for?', options: ['Central Processing Unit','Computer Personal Unit','Central Program Utility','Core Processing Unit'], answer: 0, exp: 'CPU = Central Processing Unit.' },
        { q: 'Which language is primarily used for web styling?', options: ['HTML','Python','CSS','JavaScript'], answer: 2, exp: 'CSS handles visual presentation.' },
        { q: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol','High Traffic Transfer Protocol','HyperText Transmission Process','Hosted Text Transfer Protocol'], answer: 0, exp: 'HTTP is the foundation of web data communication.' },
        { q: 'Who co-founded Apple Inc.?', options: ['Bill Gates','Elon Musk','Steve Jobs','Jeff Bezos'], answer: 2, exp: 'Steve Jobs, Steve Wozniak, and Ronald Wayne co-founded Apple.' },
        { q: 'What is the binary representation of the number 5?', options: ['011','101','110','100'], answer: 1, exp: '5 in binary is 101 (4+0+1).' },
        { q: 'What does RAM stand for?', options: ['Read Access Memory','Random Access Memory','Run-time Application Memory','Rapid Access Module'], answer: 1, exp: 'RAM = Random Access Memory.' },
        { q: 'Who created Python?', options: ['Google','Microsoft','Sun Microsystems','Guido van Rossum'], answer: 3, exp: 'Guido van Rossum created Python in 1991.' },
        { q: 'What does "AI" stand for?', options: ['Automated Interface','Artificial Intelligence','Advanced Integration','Autonomous Interaction'], answer: 1, exp: 'AI = Artificial Intelligence.' },
        { q: 'Which of these is a version control system?', options: ['Docker','Git','Node.js','Webpack'], answer: 1, exp: 'Git is the most widely used version control system.' },
        { q: 'What does "URL" stand for?', options: ['Uniform Resource Locator','Universal Reference Link','Unified Resource Layer','User Request Language'], answer: 0, exp: 'URL = Uniform Resource Locator.' }
      ]},
      'History': { icon: 'ti-history', questions: [
        { q: 'In which year did World War II end?', options: ['1943','1944','1945','1946'], answer: 2, exp: 'WWII ended in 1945.' },
        { q: 'Who was the first President of the USA?', options: ['Abraham Lincoln','Thomas Jefferson','John Adams','George Washington'], answer: 3, exp: 'George Washington served 1789–1797.' },
        { q: 'Which ancient wonder was in Alexandria?', options: ['Colossus of Rhodes','Lighthouse of Alexandria','Hanging Gardens','Temple of Artemis'], answer: 1, exp: 'The Lighthouse of Alexandria was one of the Seven Wonders.' },
        { q: 'The French Revolution began in which year?', options: ['1769','1779','1789','1799'], answer: 2, exp: 'It began in 1789 with the storming of the Bastille.' },
        { q: 'Who wrote "The Communist Manifesto"?', options: ['Lenin','Stalin','Marx & Engels','Trotsky'], answer: 2, exp: 'Karl Marx and Friedrich Engels published it in 1848.' },
        { q: 'Julius Caesar ruled which empire?', options: ['Greek','Ottoman','Roman','Byzantine'], answer: 2, exp: 'Caesar was a Roman statesman.' },
        { q: 'The Berlin Wall fell in which year?', options: ['1987','1988','1989','1990'], answer: 2, exp: 'The Berlin Wall fell on November 9, 1989.' },
        { q: 'Who was the first person to walk on the Moon?', options: ['Buzz Aldrin','Yuri Gagarin','Neil Armstrong','John Glenn'], answer: 2, exp: 'Neil Armstrong on July 20, 1969.' },
        { q: 'Which country first granted women the right to vote?', options: ['USA','UK','New Zealand','Australia'], answer: 2, exp: 'New Zealand in 1893.' },
        { q: 'The Renaissance began in which country?', options: ['France','Spain','England','Italy'], answer: 3, exp: 'It began in Italy in the 14th century.' }
      ]},
      'Maths': { icon: 'ti-math-function', questions: [
        { q: 'What is 12 × 12?', options: ['132','144','124','148'], answer: 1, exp: '12 × 12 = 144.' },
        { q: 'What is the square root of 144?', options: ['11','12','13','14'], answer: 1, exp: '√144 = 12.' },
        { q: 'What is 25% of 200?', options: ['25','40','50','75'], answer: 2, exp: '25% × 200 = 50.' },
        { q: 'If x + 5 = 12, what is x?', options: ['5','6','7','8'], answer: 2, exp: 'x = 12 − 5 = 7.' },
        { q: 'What is π approximately?', options: ['3.14','3.41','3.12','3.16'], answer: 0, exp: 'π ≈ 3.14159.' },
        { q: 'What is 2 to the power of 8?', options: ['128','256','512','64'], answer: 1, exp: '2⁸ = 256.' },
        { q: 'How many degrees in a right angle?', options: ['45°','60°','90°','180°'], answer: 2, exp: 'A right angle = 90°.' },
        { q: 'Perimeter of a square with side 7?', options: ['14','21','28','49'], answer: 2, exp: '4 × 7 = 28.' },
        { q: 'What is the value of 0!?', options: ['0','1','Undefined','∞'], answer: 1, exp: 'By definition, 0! = 1.' },
        { q: 'What is 15% of 80?', options: ['10','12','14','16'], answer: 1, exp: '0.15 × 80 = 12.' }
      ]}
    };

    // ── State ─────────────────────────────────────────────────────────────
    let questions   = [];
    let currentTopic = '';
    let idx         = 0;
    let score       = 0;
    let wrong       = 0;
    let locked      = false;

    // ── Screens ───────────────────────────────────────────────────────────
    function show(id) {
      ['screen-topic','screen-quiz','screen-result'].forEach(s => {
        document.getElementById(s).style.display = s === id ? '' : 'none';
      });
    }

    function goHome() { show('screen-topic'); }

    // ── Build topic grid ──────────────────────────────────────────────────
    function buildTopics() {
      document.getElementById('topic-grid').innerHTML =
        Object.entries(TOPICS).map(([name, t]) => `
          <div class="topic-card" onclick="startQuiz('${name}')">
            <i class="ti ${t.icon}"></i>
            <span>${name}</span>
            <small>10 questions</small>
          </div>
        `).join('');
    }

    // ── Start quiz ────────────────────────────────────────────────────────
    function startQuiz(topic) {
      currentTopic = topic;
      // Shuffle a copy of the questions
      questions = [...TOPICS[topic].questions].sort(() => Math.random() - 0.5);
      idx = 0; score = 0; wrong = 0; locked = false;
      show('screen-quiz');
      renderQuestion();
    }

    function retryTopic() { startQuiz(currentTopic); }

    // ── Render a question ─────────────────────────────────────────────────
    function renderQuestion() {
      locked = false;
      const q     = questions[idx];
      const total = questions.length;
      const pct   = Math.round((idx / total) * 100);

      document.getElementById('progress-fill').style.width = pct + '%';
      document.getElementById('q-num').textContent   = 'Question ' + (idx + 1) + ' of ' + total;
      document.getElementById('q-score').textContent = 'Score: ' + score;
      document.getElementById('question').textContent = q.q;

      const letters = ['A', 'B', 'C', 'D'];
      document.getElementById('options').innerHTML = q.options.map((o, i) => `
        <div class="opt" id="opt-${i}" onclick="choose(${i})">
          <span class="opt-letter">${letters[i]}</span>
          <span>${o}</span>
        </div>
      `).join('');

      // Reset feedback + next button
      const fb = document.getElementById('feedback');
      fb.className = 'feedback';
      fb.textContent = '';
      document.getElementById('next-btn').className = 'next-btn';
    }

    // ── Handle answer choice ──────────────────────────────────────────────
    function choose(i) {
      if (locked) return;
      locked = true;

      const q    = questions[idx];
      const opts = document.querySelectorAll('.opt');
      opts.forEach(o => o.classList.add('locked'));

      const fb = document.getElementById('feedback');

      if (i === q.answer) {
        score++;
        opts[i].classList.add('correct');
        fb.textContent = 'Correct';
        fb.className   = 'feedback correct show';
      } else {
        wrong++;
        opts[i].classList.add('wrong');
        opts[q.answer].classList.add('correct');
        fb.textContent = 'Wrong';
        fb.className   = 'feedback wrong show';
      }

      document.getElementById('q-score').textContent = 'Score: ' + score;
      document.getElementById('next-btn').className  = 'next-btn show';
    }

    // ── Next question or show result ──────────────────────────────────────
    function nextQuestion() {
      idx++;
      if (idx >= questions.length) { showResult(); return; }
      renderQuestion();
    }

    // ── Result screen ─────────────────────────────────────────────────────
    function showResult() {
      show('screen-result');

      const total = questions.length;
      const pct   = Math.round((score / total) * 100);

      document.getElementById('final-pct').textContent  = pct + '%';
      document.getElementById('final-frac').textContent = score + ' / ' + total;
      document.getElementById('stat-correct').textContent = score;
      document.getElementById('stat-wrong').textContent   = wrong;
      document.getElementById('stat-total').textContent   = total;

      // Animate ring (circumference of r=50 circle = 314)
      const circ   = 2 * Math.PI * 50;
      const offset = circ - (pct / 100) * circ;
      const ring   = document.getElementById('ring-arc');
      ring.style.strokeDashoffset = offset;
      ring.style.stroke =
        pct >= 80 ? '#3b6d11' :
        pct >= 50 ? '#854f0b' : '#a32d2d';

      // Message based on score
      const [, msg, detail] =
        pct >= 80 ? [80, 'Excellent work!',  'You really know your stuff.'] :
        pct >= 50 ? [50, 'Good effort!',      'A bit more practice and you\'ll nail it.'] :
                    [0,  'Keep going!',        'Every wrong answer is a learning moment.'];

      document.getElementById('result-msg').textContent    = msg;
      document.getElementById('result-detail').textContent = detail;
    }

    // ── Init ──────────────────────────────────────────────────────────────
    buildTopics();