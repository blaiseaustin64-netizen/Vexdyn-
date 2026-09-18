/* ============================================
   VEXDYN Learn — JavaScript Course (32 Lessons)
   Progress: localStorage key vexdyn-learn-js
   Accent: JavaScript yellow/gold #f7df1e
   All lessons unlocked (no VEXDYN+ yet)
   ============================================ */
(function () {
  "use strict";

  const STORAGE_KEY = "vexdyn-learn-js";
  const TOTAL = 32;
  const ACCENT = "#f7df1e";

  const LESSONS = [
  {
    "id": 1,
    "title": "ENTER THE LOGIC ENGINE",
    "description": "What JavaScript is, where it runs, and how it connects to HTML.",
    "mission": "Make a webpage respond to its first JavaScript command.",
    "definitions": [
      "ENTER THE LOGIC ENGINE is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "ENTER THE LOGIC ENGINE builds the next layer of interactive skill after HTML structure and CSS design. What JavaScript is, where it runs, and how it connects to HTML. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 01",
    "example": "// Connect in HTML: <script src=\"app.js\"></script>\nconsole.log(\"VEXDYN system online\");\n\nconst msg = document.getElementById(\"systemMsg\");\nif (msg) {\n  msg.textContent = \"Logic engine ready.\";\n}",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Make a webpage respond to its first JavaScript command. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 2,
    "title": "VARIABLES — STORE THE DATA",
    "description": "let, const, var, naming, and when to reassign.",
    "mission": "Create a digital learner profile system.",
    "definitions": [
      "VARIABLES is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "VARIABLES — STORE THE DATA builds the next layer of interactive skill after HTML structure and CSS design. let, const, var, naming, and when to reassign. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 02",
    "example": "const username = \"Nova\";\nconst course = \"JavaScript\";\nlet progress = 0;\nlet completedLessons = 0;\n\nprogress = 12.5;\ncompletedLessons = 4;\nconsole.log(username, course, progress + \"%\");",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a digital learner profile system. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 3,
    "title": "DATA TYPES — UNDERSTANDING INFORMATION",
    "description": "String, Number, Boolean, Undefined, Null, Array, Object, typeof.",
    "mission": "Create a structured learner data model.",
    "definitions": [
      "DATA TYPES is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "DATA TYPES — UNDERSTANDING INFORMATION builds the next layer of interactive skill after HTML structure and CSS design. String, Number, Boolean, Undefined, Null, Array, Object, typeof. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 03",
    "example": "const learner = {\n  name: \"Nova\",\n  course: \"JavaScript\",\n  progress: 0,\n  premium: false,\n  completed: []\n};\nconsole.log(typeof learner.name); // \"string\"\nconsole.log(typeof learner.progress); // \"number\"\nconsole.log(typeof learner.premium); // \"boolean\"",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a structured learner data model. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 4,
    "title": "OPERATORS — THE CALCULATION ENGINE",
    "description": "Arithmetic, assignment, comparison, logical operators.",
    "mission": "Build a course progress calculator.",
    "definitions": [
      "OPERATORS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "OPERATORS — THE CALCULATION ENGINE builds the next layer of interactive skill after HTML structure and CSS design. Arithmetic, assignment, comparison, logical operators. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 04",
    "example": "const completed = 8;\nconst total = 32;\nconst percent = Math.round((completed / total) * 100);\nconsole.log(percent + \"%\"); // 25%\n\nlet score = 10;\nscore += 5;\nscore++;\nconsole.log(score); // 16",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Build a course progress calculator. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 5,
    "title": "DECISION ENGINE — IF / ELSE",
    "description": "if, else, else if, nested conditions.",
    "mission": "Create a course access decision system.",
    "definitions": [
      "DECISION ENGINE is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "DECISION ENGINE — IF / ELSE builds the next layer of interactive skill after HTML structure and CSS design. if, else, else if, nested conditions. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 05",
    "example": "function accessStatus(progress) {\n  if (progress >= 100) return \"complete\";\n  if (progress > 0) return \"continue\";\n  return \"start\";\n}\nconsole.log(accessStatus(0));   // start\nconsole.log(accessStatus(40));  // continue\nconsole.log(accessStatus(100)); // complete",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a course access decision system. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 6,
    "title": "COMPARISON & LOGICAL OPERATORS",
    "description": "Strict equality, inequality, AND, OR, NOT.",
    "mission": "Build a reliable course eligibility checker.",
    "definitions": [
      "COMPARISON & LOGICAL OPERATORS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "COMPARISON & LOGICAL OPERATORS builds the next layer of interactive skill after HTML structure and CSS design. Strict equality, inequality, AND, OR, NOT. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 06",
    "example": "const loggedIn = true;\nconst progress = 80;\nconst premium = false;\n\nconst canContinue = loggedIn && progress > 0;\nconst canAccessPremium = loggedIn && premium;\nconst needsLogin = !loggedIn;\n\nconsole.log({ canContinue, canAccessPremium, needsLogin });",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Build a reliable course eligibility checker. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 7,
    "title": "FUNCTIONS — PACKAGE THE LOGIC",
    "description": "Declarations, parameters, arguments, return values.",
    "mission": "Create reusable course progress functions.",
    "definitions": [
      "FUNCTIONS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "FUNCTIONS — PACKAGE THE LOGIC builds the next layer of interactive skill after HTML structure and CSS design. Declarations, parameters, arguments, return values. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 07",
    "example": "function getProgress(completed, total) {\n  if (!total) return 0;\n  return Math.round((completed / total) * 100);\n}\n\nconsole.log(getProgress(8, 32)); // 25",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create reusable course progress functions. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 8,
    "title": "FUNCTION EXPRESSIONS & ARROW FUNCTIONS",
    "description": "Function expressions, arrow syntax, concise callbacks.",
    "mission": "Rewrite course utilities using modern function syntax.",
    "definitions": [
      "FUNCTION EXPRESSIONS & ARROW FUNCTIONS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "FUNCTION EXPRESSIONS & ARROW FUNCTIONS builds the next layer of interactive skill after HTML structure and CSS design. Function expressions, arrow syntax, concise callbacks. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 08",
    "example": "const double = function (value) {\n  return value * 2;\n};\n\nconst triple = value => value * 3;\n\nconsole.log(double(4)); // 8\nconsole.log(triple(4)); // 12",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Rewrite course utilities using modern function syntax. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 9,
    "title": "SCOPE — WHERE DATA LIVES",
    "description": "Global, function, block scope and lexical scope.",
    "mission": "Understand and control where application data exists.",
    "definitions": [
      "SCOPE is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "SCOPE — WHERE DATA LIVES builds the next layer of interactive skill after HTML structure and CSS design. Global, function, block scope and lexical scope. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 09",
    "example": "const appName = \"VEXDYN\";\n\nfunction createCourse() {\n  const courseName = \"JavaScript\";\n\n  if (courseName) {\n    const lessonCount = 32;\n    console.log(appName, courseName, lessonCount);\n  }\n}\n\ncreateCourse();",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Understand and control where application data exists. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 10,
    "title": "STRINGS — WORK WITH TEXT",
    "description": "Template literals, string methods, interpolation and formatting.",
    "mission": "Generate dynamic learner messages.",
    "definitions": [
      "STRINGS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "STRINGS — WORK WITH TEXT builds the next layer of interactive skill after HTML structure and CSS design. Template literals, string methods, interpolation and formatting. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 10",
    "example": "const name = \"Nova\";\nconst course = \"JavaScript\";\nconst progress = 75;\n\nconst message = `Welcome back, ${name}. You are ${progress}% through ${course}.`;\n\nconsole.log(message);\nconsole.log(course.toUpperCase());",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Generate dynamic learner messages. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 11,
    "title": "ARRAYS — DATA COLLECTIONS",
    "description": "Creating arrays, indexes, length, reading and updating.",
    "mission": "Create a course lesson database.",
    "definitions": [
      "ARRAYS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "ARRAYS — DATA COLLECTIONS builds the next layer of interactive skill after HTML structure and CSS design. Creating arrays, indexes, length, reading and updating. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 11",
    "example": "const lessons = [\n  \"ENTER THE LOGIC ENGINE\",\n  \"VARIABLES — STORE THE DATA\",\n  \"DATA TYPES\"\n];\nconsole.log(lessons[0]);\nconsole.log(lessons.length);\nlessons[2] = \"DATA TYPES — UNDERSTANDING INFORMATION\";",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a course lesson database. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 12,
    "title": "ARRAY CONTROL",
    "description": "push, pop, shift, unshift, slice, splice.",
    "mission": "Build a dynamic lesson management system.",
    "definitions": [
      "ARRAY CONTROL is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "ARRAY CONTROL builds the next layer of interactive skill after HTML structure and CSS design. push, pop, shift, unshift, slice, splice. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 12",
    "example": "const queue = [\"Lesson 1\", \"Lesson 2\"];\nqueue.push(\"Lesson 3\");\nconst last = queue.pop();\nqueue.unshift(\"Intro\");\nconst intro = queue.shift();\nconst mid = queue.slice(0, 1);\nconsole.log(queue, last, intro, mid);",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Build a dynamic lesson management system. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 13,
    "title": "ARRAY POWER",
    "description": "forEach, map, filter, find, includes.",
    "mission": "List, filter, find, and transform lesson data.",
    "definitions": [
      "ARRAY POWER is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "ARRAY POWER builds the next layer of interactive skill after HTML structure and CSS design. forEach, map, filter, find, includes. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 13",
    "example": "const lessons = [\n  { id: 1, title: \"Variables\", done: true },\n  { id: 2, title: \"Functions\", done: false },\n  { id: 3, title: \"Arrays\", done: false }\n];\nconst open = lessons.filter(l => !l.done);\nconst titles = lessons.map(l => l.title);\nconst found = lessons.find(l => l.id === 2);\nconsole.log(open, titles, found);",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "List, filter, find, and transform lesson data. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 14,
    "title": "OBJECTS — MODEL REAL SYSTEMS",
    "description": "Properties, methods, access, update, this.",
    "mission": "Create a realistic learner object.",
    "definitions": [
      "OBJECTS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "OBJECTS — MODEL REAL SYSTEMS builds the next layer of interactive skill after HTML structure and CSS design. Properties, methods, access, update, this. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 14",
    "example": "const learner = {\n  name: \"Nova\",\n  course: \"JavaScript\",\n  progress: 25,\n  markComplete(id) {\n    this.progress = Math.min(100, this.progress + 3);\n    console.log(\"Completed\", id, this.progress + \"%\");\n  }\n};\nlearner.markComplete(8);",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a realistic learner object. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 15,
    "title": "ARRAYS + OBJECTS",
    "description": "Arrays of objects, nested data, find and filter.",
    "mission": "Create a complete course database.",
    "definitions": [
      "ARRAYS + OBJECTS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "ARRAYS + OBJECTS builds the next layer of interactive skill after HTML structure and CSS design. Arrays of objects, nested data, find and filter. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 15",
    "example": "const courses = [\n  { id: \"html\", lessons: 20, progress: 100 },\n  { id: \"css\", lessons: 24, progress: 50 },\n  { id: \"javascript\", lessons: 32, progress: 0 }\n];\nconst js = courses.find(c => c.id === \"javascript\");\nconst active = courses.filter(c => c.progress > 0);\nconsole.log(js, active);",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Create a complete course database. Write the code yourself, then verify the result in the console or on a small HTML page."
  },
  {
    "id": 16,
    "title": "LOOPS — AUTOMATION ENGINE",
    "description": "for, while, do...while, for...of.",
    "mission": "Generate course information without repeating code.",
    "definitions": [
      "LOOPS is a core JavaScript skill used when building interactive interfaces.",
      "Practice by writing small, testable snippets before connecting them to the full page."
    ],
    "explanation": "LOOPS — AUTOMATION ENGINE builds the next layer of interactive skill after HTML structure and CSS design. for, while, do...while, for...of. Read the example, run it in the browser console or a script file, then change values to see how behaviour shifts. JavaScript runs in the browser engine, responds to user actions, and updates the page without a full reload when you use the DOM APIs. Keep examples small, verify with console.log, then connect the same logic to real UI elements.",
    "exampleTitle": "JS / Lesson 16",
    "example": "const lessons = [\"HTML\", \"CSS\", \"JavaScript\", \"React\"];\n\nfor (let i = 0; i < lessons.length; i++) {\n  console.log(i + 1, lessons[i]);\n}\n\nfor (const lesson of lessons) {\n  console.log(\"Course:\", lesson);\n}",
    "breakdown": "• Read top to bottom — declarations first, then logic\n• Note which values are stored vs computed\n• Identify the function or block that produces the result\n• Rewrite the example with your own names and data\n• Connect the same idea to a button or text node on a page",
    "application": "VEXDYN Learn uses these patterns for course data, progress percentages, lesson lists, and completion state. The same ideas power theme switching, search, and interactive dashboards across the platform.",
    "challenge": "Generate course information without repeating code. Write the code yourself, then verify the result in the console or on a small HTML page."
  }    if (pctEl) {
      const prev = parseInt(pctEl.textContent, 10) || 0;
      animatePercent(pctEl, prev, pct);
    }

    if (barEl) barEl.style.width = pct + "%";

    if (statusEl) {
      statusEl.textContent =
        pct === 0
          ? "NOT STARTED"
          : pct >= 100
            ? "JAVASCRIPT SYSTEM INITIALIZED"
            : "IN PROGRESS";
    }

    if (completeBanner) {
      completeBanner.hidden = pct < 100;
    }

    list.innerHTML = LESSONS.map((lesson) => {
      const done = isComplete(lesson.id, completed);

      const badge = done
        ? '<span class="lesson-badge lesson-badge-done"><span class="lesson-badge-icon" aria-hidden="true">✓</span> COMPLETE</span>'
        : '<span class="lesson-badge lesson-badge-open">OPEN</span>';

      return `
        <button
          type="button"
          class="lesson-item ${done ? "is-complete" : ""}"
          data-js-open-lesson="${lesson.id}"
          aria-label="Lesson ${lesson.id}: ${escapeHtml(lesson.title)}"
        >
          <span class="lesson-item-top">
            <span class="lesson-item-num" style="color:${ACCENT}">
              ${String(lesson.id).padStart(2, "0")}
            </span>
            ${badge}
          </span>
          <span class="lesson-item-title">${escapeHtml(lesson.title)}</span>
          <span class="lesson-item-mission">${escapeHtml(lesson.description)}</span>
        </button>`;
    }).join("");
  }

  function openLesson(id) {
    const lesson = LESSONS.find((l) => l.id === id);
    if (!lesson) return;

    const { completed } = loadProgress();
    const done = isComplete(id, completed);

    const set = (sid, text) => {
      const el = document.getElementById(sid);
      if (el) el.textContent = text;
    };

    set(
      "jsLessonNum",
      "LESSON " + String(lesson.id).padStart(2, "0")
    );

    set("jsLessonTitle", lesson.title);
    set("jsLessonMission", lesson.mission);

    const defsEl = document.getElementById("jsLessonDefs");

    if (defsEl) {
      defsEl.innerHTML = lesson.definitions
        .map(
          (d, i) =>
            `<div class="lesson-def">
              <span class="lesson-def-label">Definition ${i + 1}</span>
              <p>${escapeHtml(d)}</p>
            </div>`
        )
        .join("");
    }

    set("jsLessonExplanation", lesson.explanation);
    set("jsExampleTitle", lesson.exampleTitle || "Example");

    const exampleEl =
      document.getElementById("jsLessonExample");

    if (exampleEl) {
      exampleEl.textContent = lesson.example;
    }

    set("jsLessonBreakdown", lesson.breakdown);
    set("jsLessonApplication", lesson.application);
    set("jsLessonChallenge", lesson.challenge);

    const completeBtn =
      document.getElementById("jsLessonCompleteBtn");

    const nextBtn =
      document.getElementById("jsLessonNextBtn");

    const prevBtn =
      document.getElementById("jsLessonPrevBtn");

    if (completeBtn) {
      completeBtn.disabled = done;

      completeBtn.textContent = done
        ? "✓ LESSON COMPLETE"
        : "MARK LESSON COMPLETE";

      completeBtn.dataset.lessonId = String(lesson.id);
    }

    if (prevBtn) {
      prevBtn.disabled = lesson.id <= 1;
      prevBtn.dataset.jsGoto = String(lesson.id - 1);
    }

    if (nextBtn) {
      nextBtn.disabled = lesson.id >= TOTAL;
      nextBtn.dataset.jsGoto = String(lesson.id + 1);
    }

    const lessonView =
      document.getElementById("jsLessonView");

    if (lessonView) {
      lessonView.setAttribute(
        "data-lesson-ambient",
        String(((lesson.id - 1) % 8) + 1)
      );
    }

    showView("lesson");
  }

  async function markComplete(id) {
    if (
      window.VEXDYN_LEARN &&
      typeof window.VEXDYN_LEARN
        .saveAuthenticatedLessonCompletion === "function"
    ) {
      const result =
        await window.VEXDYN_LEARN
          .saveAuthenticatedLessonCompletion(
            "javascript",
            id
          );

      if (result && result.authenticated) {
        if (result.error) {
          alert(
            "We couldn't save this lesson to your account. Please try again."
          );
          return;
        }

        openLesson(id);
        syncCatalogProgress();
        return;
      }
    }

    const data = loadProgress();

    if (!isComplete(id, data.completed)) {
      data.completed.push(id);
      data.completed.sort((a, b) => a - b);
      saveProgress(data.completed);
    }

    openLesson(id);
    syncCatalogProgress();
  }

  function syncCatalogProgress() {
    const { completed } = loadProgress();
    const pct = getPercent(completed);

    const status =
      pct === 0
        ? "not-started"
        : pct >= 100
          ? "completed"
          : "in-progress";

    if (
      window.VEXDYN_LEARN &&
      window.VEXDYN_LEARN.COURSES
    ) {
      const course =
        window.VEXDYN_LEARN.COURSES.find(
          (c) => c.id === "javascript"
        );

      if (course) {
        course.progress = pct;
        course.status = status;
      }

      if (
        typeof window.VEXDYN_LEARN.updateJourney ===
        "function"
      ) {
        window.VEXDYN_LEARN.updateJourney(
          window.VEXDYN_LEARN.COURSES
        );
      }

      const catalog =
        document.getElementById("learnCatalog");

      if (
        catalog &&
        !catalog.hidden &&
        typeof window.VEXDYN_LEARN.renderCourses ===
          "function"
      ) {
        window.VEXDYN_LEARN.renderCourses(
          window.VEXDYN_LEARN.COURSES
        );
      }
    }

    const card = document.querySelector(
      '[data-course-id="javascript"]'
    );

    if (card) {
      const fill =
        card.querySelector("[data-progress-fill]");

      const num =
        card.querySelector("[data-progress-num]");

      const st =
        card.querySelector("[data-status]");

      const cta =
        card.querySelector("[data-course-cta]");

      if (fill) {
        fill.style.width = pct + "%";
        fill.style.background = ACCENT;
      }

      if (num) {
        num.textContent = pct + "%";
      }

      if (st) {
        st.textContent =
          status === "not-started"
            ? "NOT STARTED"
            : status === "completed"
              ? "COMPLETED"
              : "IN PROGRESS";
      }

      if (cta) {
        cta.textContent =
          (
            status === "not-started"
              ? "START LEARNING"
              : status === "completed"
                ? "REVIEW"
                : "CONTINUE"
          ) + " →";
      }
    }
  }

  function copyCode() {
    const exampleEl =
      document.getElementById("jsLessonExample");

    const btn =
      document.getElementById("jsCopyBtn");

    if (!exampleEl || !btn) return;

    const text = exampleEl.textContent || "";

    const done = () => {
      btn.textContent = "✓ COPIED";

      setTimeout(() => {
        btn.textContent = "COPY";
      }, 1600);
    };

    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard
        .writeText(text)
        .then(done)
        .catch(() => {
          const ta =
            document.createElement("textarea");

          ta.value = text;

          document.body.appendChild(ta);

          ta.select();

          try {
            document.execCommand("copy");
          } catch {}

          document.body.removeChild(ta);

          done();
        });
    }
  }

  function openJsCourse() {
    try {
      renderCourseList();
      showView("course");
    } catch (err) {
      console.error(
        "VEXDYN JavaScript course open failed:",
        err
      );
    }
  }

  function initJsCourse() {
    if (
      !document.getElementById("jsCourseView")
    ) {
      console.warn(
        "VEXDYN: jsCourseView not found"
      );
      return;
    }

    syncCatalogProgress();

    document.addEventListener("click", (e) => {
      const cta =
        e.target.closest("[data-course-cta]");

      const card =
        e.target.closest(
          '[data-course-id="javascript"]'
        );

      const id = cta
        ? cta.getAttribute("data-id")
        : null;

      if (
        (cta && id === "javascript") ||
        (
          card &&
          !e.target.closest("[data-course-cta]") &&
          false
        )
      ) {
        // only CTA opens course
      }

      if (cta && id === "javascript") {
        e.preventDefault();
        e.stopPropagation();

        openJsCourse();

        return;
      }

      const openBtn =
        e.target.closest(
          "[data-open-js-course]"
        );

      if (openBtn) {
        e.preventDefault();
        e.stopPropagation();

        openJsCourse();

        return;
      }

      const backCatalog =
        e.target.closest(
          "[data-js-back-catalog]"
        );

      if (backCatalog) {
        e.preventDefault();

        syncCatalogProgress();

        const catalog =
          document.getElementById("learnCatalog");

        const jsCourse =
          document.getElementById("jsCourseView");

        const jsLesson =
          document.getElementById("jsLessonView");

        if (catalog) {
          catalog.hidden = false;
        }

        if (jsCourse) {
          jsCourse.hidden = true;
        }

        if (jsLesson) {
          jsLesson.hidden = true;
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        if (
          window.VEXDYN_LEARN &&
          typeof window.VEXDYN_LEARN
            .animateCatalogProgress === "function"
        ) {
          setTimeout(function () {
            window.VEXDYN_LEARN
              .animateCatalogProgress();
          }, 120);
        }

        return;
      }

      const backCourse =
        e.target.closest(
          "[data-js-back-course]"
        );

      if (backCourse) {
        e.preventDefault();

        renderCourseList();
        showView("course");

        return;
      }

      const openLessonBtn =
        e.target.closest(
          "[data-js-open-lesson]"
        );

      if (openLessonBtn) {
        e.preventDefault();

        openLesson(
          parseInt(
            openLessonBtn.dataset.jsOpenLesson,
            10
          )
        );

        return;
      }

      const completeBtn =
        e.target.closest(
          "#jsLessonCompleteBtn"
        );

      if (
        completeBtn &&
        !completeBtn.disabled
      ) {
        e.preventDefault();

        markComplete(
          parseInt(
            completeBtn.dataset.lessonId,
            10
          )
        );

        return;
      }

      const navBtn =
        e.target.closest(
          "[data-js-goto]"
        );

      if (
        navBtn &&
        !navBtn.disabled
      ) {
        e.preventDefault();

        openLesson(
          parseInt(
            navBtn.dataset.jsGoto,
            10
          )
        );

        return;
      }

      if (
        e.target.closest("#jsCopyBtn")
      ) {
        e.preventDefault();
        copyCode();
      }
    });
         }        e.preventDefault();
        openLesson(parseInt(navBtn.getAttribute("data-js-goto"), 10));
        return;
      }

      if (e.target.closest("#jsCopyBtn")) {
        e.preventDefault();
        copyCode();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initJsCourse);

  document.addEventListener("vexdyn-open-js-course", function () {
    openJsCourse();
  });

  window.VEXDYN_JS_COURSE = {
    LESSONS,
    loadProgress,
    getPercent,
    renderCourseList,
    openJsCourse
  };
})();
