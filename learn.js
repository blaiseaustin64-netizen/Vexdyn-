/* ============================================
   VEXDYN Learn — Build 1 Foundation
   Course data + UI (progress engine = Build 2)
   ============================================ */
(function () {
  "use strict";

  /** Course catalog — all progress 0 for Build 1 */
  const COURSES = [
    {
      id: "html",
      name: "HTML",
      fullName: "HyperText Markup Language",
      description: "Structure the web with semantic markup and accessible document foundations.",
      color: "#e34f26",
      colorSoft: "rgba(227, 79, 38, 0.14)",
      difficulty: "Beginner",
      category: "web",
      lessons: 20,
      progress: 0,
      status: "not-started",
      pathOrder: 1
    },
    {
      id: "css",
      name: "CSS",
      fullName: "Cascading Style Sheets",
      description: "Design responsive layouts, motion and visual systems for modern interfaces.",
      color: "#1572b6",
      colorSoft: "rgba(21, 114, 182, 0.14)",
      difficulty: "Beginner",
      category: "web",
      lessons: 24,
      progress: 0,
      status: "not-started",
      pathOrder: 2
    },
    {
      id: "javascript",
      name: "JavaScript",
      fullName: "JavaScript",
      description: "Add interactivity, logic and dynamic behaviour to digital experiences.",
      color: "#f7df1e",
      colorSoft: "rgba(247, 223, 30, 0.16)",
      difficulty: "Intermediate",
      category: "web",
      lessons: 32,
      progress: 0,
      status: "not-started",
      pathOrder: 3
    },
    {
      id: "react",
      name: "React",
      fullName: "React",
      description: "Build component-driven interfaces with the modern frontend library.",
      color: "#61dafb",
      colorSoft: "rgba(97, 218, 251, 0.14)",
      difficulty: "Advanced",
      category: "web",
      lessons: 36,
      progress: 0,
      status: "not-started",
      pathOrder: 4
    }
  ];

  const STATUS_LABEL = {
    "not-started": "NOT STARTED",
    "in-progress": "IN PROGRESS",
    "completed": "COMPLETED"
  };

  const STATUS_CTA = {
    "not-started": "START LEARNING",
    "in-progress": "CONTINUE",
    "completed": "REVIEW"
  };

  const TOTAL_LESSONS = COURSES.reduce((sum, course) => sum + course.lessons, 0);

  /** Recognizable tech logos (inline SVG) */
  const LOGOS = {
    html: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#E34F26" d="M4 2l2.2 24.8L16 30l9.8-3.2L28 2H4zm18.1 8.2H11.2l.3 3.2h10.3l-.9 10.1L16 25.1l-4.6-1.2-.3-3.3h3.2l.2 1.7 1.5.4 1.5-.4.2-2.1H11.1L10.4 8h11.4l.3 2.2z"/></svg>`,
    css: `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#1572B6" d="M4 2l2.2 24.8L16 30l9.8-3.2L28 2H4zm17.5 8.3l-.4 4.1-.2 2.2H11.2l.2 2.4h9.5l-.1 1.2-.7 7.7L16 25.3l-4.1-1.1-.3-3h-3.2l.5 5.6L16 29l7.1-2 1-10.6.2-2.2.4-4.9H9.8l-.3-3.2h12z"/></svg>`,
    javascript: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="3" fill="#F7DF1E"/><path fill="#323330" d="M18.2 23.6c.4.7.8 1.3 1.8 1.3 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.6-1.6l-.6-.2c-1.6-.7-2.7-1.6-2.7-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.5.5 3.2 1.8l-1.8 1.1c-.4-.7-.8-1-1.5-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.4 1.4l.6.3c1.9.8 3 1.8 3 3.8 0 2.1-1.7 3.3-3.9 3.3-2.2 0-3.6-1-4.3-2.4l1.9-1.1zm-7.4.2c.3.5.6.9 1.2.9.6 0 1-.2 1-.8V15h2.3v8.9c0 2.4-1.4 3.5-3.4 3.5-1.8 0-2.9-.9-3.4-2.1l1.9-1.1z"/></svg>`,
    react: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="2.4" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" stroke-width="1.6"><ellipse cx="16" cy="16" rx="11" ry="4.2"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)"/></g></svg>`
  };

  function statusFromProgress(p) {
    if (p >= 100) return "completed";
    if (p > 0) return "in-progress";
    return "not-started";
  }

  function renderCourseCard(course) {
    const status = course.status || statusFromProgress(course.progress);
    const logo = LOGOS[course.id] || "";
    return `
      <article class="course-card reveal" data-course-id="${course.id}" data-category="${course.category}" data-name="${course.name.toLowerCase()}" style="--tech-color:${course.color};--tech-soft:${course.colorSoft}">
        <div class="course-card-accent"></div>
        <div class="course-logo" aria-hidden="true">${logo}</div>
        <h3 class="course-name">${course.name}</h3>
        <p class="course-fullname">${course.fullName}</p>
        <p class="course-desc">${course.description}</p>
        <div class="course-meta">
          <span class="course-diff">${course.difficulty}</span>
          <span class="course-lessons">${course.lessons} Lessons</span>
        </div>
        <div class="course-progress">
          <div class="course-progress-bar"><div class="course-progress-fill" data-progress-fill data-target-progress="${course.progress}" style="width:0%;background:${course.color}"></div></div>
          <span class="course-progress-num" data-progress-num data-target-progress="${course.progress}">0%</span>
        </div>
        <div class="course-status" data-status>${STATUS_LABEL[status]}</div>
        <button type="button" class="btn btn-primary course-cta" data-course-cta data-id="${course.id}">${STATUS_CTA[status]} →</button>
      </article>`;
  }

  function renderPath(courses) {
    const ordered = courses.slice().sort((a, b) => a.pathOrder - b.pathOrder);
    return ordered.map((c, i) => {
      const logo = LOGOS[c.id] || "";
      return `
        <div class="path-node" style="--tech-color:${c.color}">
          <div class="path-logo">${logo}</div>
          <div class="path-name">${c.name}</div>
          <div class="path-pct" data-journey-pct data-target-progress="${c.progress}">0%</div>
        </div>
        ${i < ordered.length - 1 ? '<span class="path-arrow" aria-hidden="true">→</span>' : ""}
      `;
    }).join("");
  }

  function updateJourney(courses) {
    const total = courses.length;
    const sum = courses.reduce((s, c) => s + (c.progress || 0), 0);
    const avg = total ? Math.round(sum / total) : 0;
    const progressEl = document.getElementById("journeyProgress");
    const barEl = document.getElementById("journeyBarFill");
    const coursesEl = document.getElementById("journeyCourses");
    const statusEl = document.getElementById("journeyStatus");
    if (progressEl) progressEl.textContent = avg + "%";
    if (barEl) barEl.style.width = avg + "%";
    if (coursesEl) coursesEl.textContent = String(total);
    if (statusEl) {
      statusEl.textContent = avg === 0 ? "NOT STARTED" : avg >= 100 ? "COMPLETED" : "IN PROGRESS";
    }
  }

  function filterCourses(query, category) {
    const q = (query || "").trim().toLowerCase();
    return COURSES.filter((c) => {
      const matchCat = !category || category === "all" || c.category === category;
      const matchQ = !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.difficulty.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }

  function renderCourses(list) {
    const grid = document.getElementById("courseGrid");
    const empty = document.getElementById("courseEmpty");
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    grid.innerHTML = list.map(renderCourseCard).join("");
    // re-observe reveals
    if (typeof window !== "undefined") {
      const els = grid.querySelectorAll(".reveal");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Step 1: Supabase course/lesson UUID mapping ---------- */
  const FRONTEND_LESSON_SOURCES = {
    html: () => window.VEXDYN_HTML_COURSE && window.VEXDYN_HTML_COURSE.LESSONS,
    css: () => window.VEXDYN_CSS_COURSE && window.VEXDYN_CSS_COURSE.LESSONS,
    javascript: () => window.VEXDYN_JS_COURSE && window.VEXDYN_JS_COURSE.LESSONS,
    react: () => window.VEXDYN_REACT_COURSE && window.VEXDYN_REACT_COURSE.LESSONS
  };

  function step1Mismatch(courseSlug, message, details) {
    const error = new Error(
      "VEXDYN Learn Step 1 mapping mismatch [" + courseSlug + "]: " + message +
      (details ? " " + details : "")
    );
    console.error(error.message, error);
    return error;
  }

  function validateFrontendLessons(course) {
    const source = FRONTEND_LESSON_SOURCES[course.id];
    const lessons = typeof source === "function" ? source() : null;

    if (!Array.isArray(lessons)) {
      throw step1Mismatch(
        course.id,
        "Frontend lesson array is unavailable.",
        "Expected " + course.lessons + " local lessons."
      );
    }

    const numbers = lessons.map((lesson) => Number(lesson && lesson.id));
    const invalid = numbers.filter((number) => !Number.isInteger(number) || number < 1);
    const duplicates = numbers.filter((number, index) => numbers.indexOf(number) !== index);
    const expected = Array.from({ length: course.lessons }, (_, index) => index + 1);
    const missing = expected.filter((number) => !numbers.includes(number));
    const unexpected = numbers.filter((number) => !expected.includes(number));

    if (
      lessons.length !== course.lessons ||
      invalid.length ||
      duplicates.length ||
      missing.length ||
      unexpected.length
    ) {
      throw step1Mismatch(
        course.id,
        "Frontend lesson numbering does not match the declared course structure.",
        JSON.stringify({
          expectedCount: course.lessons,
          actualCount: lessons.length,
          invalid,
          duplicates: Array.from(new Set(duplicates)),
          missing,
          unexpected
        })
      );
    }

    return expected;
  }

  async function buildSupabaseLessonMapping() {
    const auth = window.vexdynAuth;
    if (!auth || !auth.client || !auth.ready) {
      throw new Error(
        "VEXDYN Learn Step 1: window.vexdynAuth.client / ready is unavailable. " +
        "The existing Supabase client could not be used."
      );
    }

    await auth.ready;

    const client = auth.client;
    const expectedCourses = COURSES.map((course) => course.id);

    const { data: backendCourses, error: coursesError } = await client
      .from("courses")
      .select("id, slug")
      .eq("published", true);

    if (coursesError) {
      throw new Error(
        "VEXDYN Learn Step 1: failed to retrieve published courses: " +
        coursesError.message
      );
    }

    if (!Array.isArray(backendCourses)) {
      throw new Error(
        "VEXDYN Learn Step 1: published courses query returned an unexpected result."
      );
    }

    const coursesBySlug = new Map();
    backendCourses.forEach((course) => {
      const slug = typeof course.slug === "string" ? course.slug.trim().toLowerCase() : "";
      if (!slug) return;

      if (coursesBySlug.has(slug)) {
        throw step1Mismatch(
          slug,
          "Duplicate published course slug returned by Supabase.",
          JSON.stringify({
            existingCourseId: coursesBySlug.get(slug).id,
            duplicateCourseId: course.id
          })
        );
      }

      coursesBySlug.set(slug, course);
    });

    const missingCourses = expectedCourses.filter((slug) => !coursesBySlug.has(slug));
    const unexpectedCourses = Array.from(coursesBySlug.keys())
      .filter((slug) => !expectedCourses.includes(slug));

    if (missingCourses.length || unexpectedCourses.length) {
      throw new Error(
        "VEXDYN Learn Step 1 course mapping mismatch: " +
        JSON.stringify({ missingCourses, unexpectedPublishedCourses: unexpectedCourses })
      );
    }

    const mapping = {
      byCourseSlug: {},
      courses: {}
    };

    for (const course of COURSES) {
      const backendCourse = coursesBySlug.get(course.id);
      const expectedNumbers = validateFrontendLessons(course);

      const { data: backendLessons, error: lessonsError } = await client
        .from("lessons")
        .select("id, course_id, lesson_number")
        .eq("course_id", backendCourse.id)
        .eq("published", true)
        .order("lesson_number", { ascending: true });

      if (lessonsError) {
        throw new Error(
          "VEXDYN Learn Step 1: failed to retrieve published lessons for " +
          course.id + ": " + lessonsError.message
        );
      }

      if (!Array.isArray(backendLessons)) {
        throw new Error(
          "VEXDYN Learn Step 1: lessons query returned an unexpected result for " +
          course.id + "."
        );
      }

      const byNumber = new Map();
      const duplicates = [];

      backendLessons.forEach((lesson) => {
        const number = Number(lesson && lesson.lesson_number);

        if (!Number.isInteger(number)) {
          duplicates.push({ lessonId: lesson && lesson.id, lessonNumber: lesson && lesson.lesson_number });
          return;
        }

        if (byNumber.has(number)) {
          duplicates.push({
            lessonNumber: number,
            lessonIds: [byNumber.get(number).id, lesson.id]
          });
          return;
        }

        byNumber.set(number, lesson);
      });

      const missing = expectedNumbers.filter((number) => !byNumber.has(number));
      const unexpected = Array.from(byNumber.keys())
        .filter((number) => !expectedNumbers.includes(number));

      if (
        backendLessons.length !== expectedNumbers.length ||
        duplicates.length ||
        missing.length ||
        unexpected.length
      ) {
        throw step1Mismatch(
          course.id,
          "Published backend lessons do not match the frontend lesson structure exactly.",
          JSON.stringify({
            expectedCount: expectedNumbers.length,
            actualCount: backendLessons.length,
            missing,
            unexpected,
            duplicates
          })
        );
      }

      const courseMap = {};
      expectedNumbers.forEach((lessonNumber) => {
        const lesson = byNumber.get(lessonNumber);
        courseMap[String(lessonNumber)] = lesson.id;
      });

      mapping.byCourseSlug[course.id] = courseMap;
      mapping.courses[course.id] = {
        id: backendCourse.id,
        slug: backendCourse.slug,
        lessonCount: expectedNumbers.length
      };
    }

    return mapping;
  }

  function initializeStep1BackendMapping() {
    const target = {
      status: "loading",
      mapping: null,
      error: null,
      ready: null
    };

    target.ready = buildSupabaseLessonMapping()
      .then((mapping) => {
        target.status = "ready";
        target.mapping = mapping;
        window.VEXDYN_LEARN_BACKEND = target;

        console.info(
          "VEXDYN Learn Step 1: Supabase lesson UUID mapping ready.",
          Object.keys(mapping.byCourseSlug).reduce((summary, slug) => {
            summary[slug] = Object.keys(mapping.byCourseSlug[slug]).length;
            return summary;
          }, {})
        );

        return mapping;
      })
      .catch((error) => {
        target.status = "error";
        target.error = error;
        window.VEXDYN_LEARN_BACKEND = target;
        console.error(
          "VEXDYN Learn Step 1: backend mapping was not completed. " +
          "Existing local lesson content/progress remains unchanged.",
          error
        );
        return null;
      });

    window.VEXDYN_LEARN_BACKEND = target;
  }

  async function loadAuthenticatedLearnProgress(sessionOverride) {
    const auth = window.vexdynAuth;
    const state = {
      status: "guest",
      userId: null,
      completedByCourse: { html: [], css: [], javascript: [], react: [] },
      error: null
    };

    if (!auth || !auth.ready) {
      console.error("VEXDYN Learn Step 2: existing auth system is unavailable; keeping guest/local progress behavior.");
      return state;
    }

    const session = sessionOverride || await auth.ready;
    if (!session || !session.user || !session.user.id) {
      return state;
    }

    state.status = "loading";
    state.userId = session.user.id;

    try {
      const backend = window.VEXDYN_LEARN_BACKEND;
      if (!backend || !backend.ready) {
        throw new Error("Step 1 backend lesson mapping is unavailable.");
      }

      const mapping = await backend.ready;
      if (!mapping) {
        throw new Error("Step 1 backend lesson mapping failed, so cloud progress cannot be mapped safely.");
      }

      const uuidToFrontend = new Map();
      Object.keys(mapping.byCourseSlug).forEach((slug) => {
        Object.keys(mapping.byCourseSlug[slug]).forEach((lessonNumber) => {
          const uuid = mapping.byCourseSlug[slug][lessonNumber];
          uuidToFrontend.set(uuid, { courseSlug: slug, lessonNumber: Number(lessonNumber) });
        });
      });

      const { data, error } = await auth.client
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", session.user.id);

      if (error) {
        throw new Error("Failed to retrieve authenticated Learn progress: " + error.message);
      }

      if (!Array.isArray(data)) {
        throw new Error("lesson_progress query returned an unexpected result.");
      }

      const seen = new Set();
      data.forEach((row) => {
        const mapped = uuidToFrontend.get(row && row.lesson_id);
        if (!mapped) {
          console.error(
            "VEXDYN Learn Step 2: progress row references a lesson UUID that is not in the published Step 1 mapping; ignoring that row.",
            { lessonId: row && row.lesson_id }
          );
          return;
        }

        const key = mapped.courseSlug + ":" + mapped.lessonNumber;
        if (seen.has(key)) return;
        seen.add(key);
        state.completedByCourse[mapped.courseSlug].push(mapped.lessonNumber);
      });

      Object.keys(state.completedByCourse).forEach((slug) => {
        state.completedByCourse[slug].sort((a, b) => a - b);
      });

      state.status = "ready";
      console.info("VEXDYN Learn Step 2: authenticated cloud progress loaded (read-only).", {
        userId: session.user.id,
        rows: data.length,
                 completedByCourse: state.completedByCourse
      });
    } catch (error) {
      state.status = "error";
      state.error = error;
      console.error(
        "VEXDYN Learn Step 2: cloud progress could not be loaded. Learn will preserve safe existing local/guest behavior.",
        error
      );
    }

    return state;
  }

  async function saveAuthenticatedLessonCompletion(courseSlug, lessonNumber) {
    const auth = window.vexdynAuth;
    if (!auth || !auth.ready || !auth.client) {
      return { handled: false, authenticated: false };
    }

    let session;
    try {
      session = await auth.ready;
    } catch (error) {
      console.error("VEXDYN Learn Step 3: authentication state could not be resolved.", error);
      return { handled: true, authenticated: false, error: error };
    }

    if (!session || !session.user || !session.user.id) {
      return { handled: false, authenticated: false };
    }

    const backend = window.VEXDYN_LEARN_BACKEND;
    if (!backend || !backend.ready) {
      const error = new Error("Step 1 backend lesson mapping is unavailable.");
      console.error("VEXDYN Learn Step 3: cannot save lesson completion.", error);
      return { handled: true, authenticated: true, error: error };
    }

    try {
      const mapping = await backend.ready;
      const cloudState = window.VEXDYN_LEARN_PROGRESS;
      if (cloudState && cloudState.status === "error") {
        throw new Error("Cloud Learn progress is unavailable; refresh and try again.");
      }
      if (!mapping || !mapping.byCourseSlug || !mapping.byCourseSlug[courseSlug]) {
        throw new Error("No backend course mapping exists for " + courseSlug + ".");
      }

      const lessonId = mapping.byCourseSlug[courseSlug][String(lessonNumber)];
      if (!lessonId) {
        throw new Error(
          "No published Supabase lesson UUID exists for " +
          courseSlug + " lesson " + lessonNumber + "."
        );
      }

      const { error } = await auth.client
        .from("lesson_progress")
        .upsert(
          {
            user_id: session.user.id,
            lesson_id: lessonId
          },
          {
            onConflict: "user_id,lesson_id",
            ignoreDuplicates: true
          }
        );

      if (error) {
        throw new Error("Failed to save Learn lesson completion: " + error.message);
      }

      // Step 3 keeps the already-loaded cloud state immediately consistent.
      const cloud = window.VEXDYN_LEARN_PROGRESS;
      if (!cloud || cloud.status !== "ready") {
        window.VEXDYN_LEARN_PROGRESS = {
          status: "ready",
          userId: session.user.id,
          completedByCourse: { html: [], css: [], javascript: [], react: [] },
          error: null
        };
      }

      const state = window.VEXDYN_LEARN_PROGRESS;
      if (state.userId !== session.user.id) {
        throw new Error("Authenticated Learn progress state belongs to a different session.");
      }
      if (!state.completedByCourse || !Array.isArray(state.completedByCourse[courseSlug])) {
        state.completedByCourse[courseSlug] = [];
      }
      if (!state.completedByCourse[courseSlug].includes(Number(lessonNumber))) {
        state.completedByCourse[courseSlug].push(Number(lessonNumber));
        state.completedByCourse[courseSlug].sort((a, b) => a - b);
      }

      const course = COURSES.find((item) => item.id === courseSlug);
      if (course) {
        course.progress = Math.round(
          (state.completedByCourse[courseSlug].length / course.lessons) * 100
        );
        course.status = statusFromProgress(course.progress);
      }

      updateJourney(COURSES);
      return { handled: true, authenticated: true, success: true };
    } catch (error) {
      console.error("VEXDYN Learn Step 3: lesson completion was not saved to Supabase.", error);
      return { handled: true, authenticated: true, error: error };
    }
  }

  function isAuthenticatedLearnUser() {
    const state = window.VEXDYN_LEARN_PROGRESS;
    return !!(
      state &&
      state.userId &&
      state.status === "ready"
    );
  }

  function applyAuthenticatedProgress(state) {
    window.VEXDYN_LEARN_PROGRESS = state;
    if (!state || state.status !== "ready") return false;

    COURSES.forEach((course) => {
      const completed = state.completedByCourse[course.id] || [];
      course.progress = Math.round((completed.length / course.lessons) * 100);
      course.status = statusFromProgress(course.progress);
    });

    return true;
  }

  /* ---------- Step 4: Learn Profile ---------- */
  function getProfileIdentity(session, profile) {
    const user = session && session.user ? session.user : null;
    const metadata = user && user.user_metadata ? user.user_metadata : {};
    const fullName = (profile && profile.full_name) || metadata.full_name || "VEXDYN Member";
    const username = (profile && profile.username) || metadata.username || "";
    const email = user && user.email ? user.email : "";
    const sourceName = String(fullName).trim() || "VEXDYN Member";
    const initials = sourceName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "V";
    return { fullName: sourceName, username, email, initials };
  }

  function firstIncompleteLesson(course, completed) {
    const source = FRONTEND_LESSON_SOURCES[course.id];
    const lessons = typeof source === "function" ? source() : null;
    if (!Array.isArray(lessons)) return null;

    for (const lesson of lessons) {
      const number = Number(lesson && lesson.id);
      if (Number.isInteger(number) && !completed.includes(number)) return number;
    }
    return null;
  }

  function openProfileCourseLesson(courseId, lessonNumber) {
    const cta = document.querySelector('[data-course-cta][data-id="' + courseId + '"]');
    if (cta) {
      cta.click();
    } else {
      return;
    }

    // The existing course scripts render their lesson lists synchronously.
    // Reuse those lists and their existing click handlers rather than creating
    // a second lesson/navigation system.
    setTimeout(function () {
      const selectors = {
        html: '[data-open-lesson="' + lessonNumber + '"]',
        css: '[data-css-open-lesson="' + lessonNumber + '"]',
        javascript: '[data-js-open-lesson="' + lessonNumber + '"]',
        react: '[data-react-open-lesson="' + lessonNumber + '"]'
      };
      const lessonButton = document.querySelector(selectors[courseId]);
      if (lessonButton) lessonButton.click();
    }, 40);
  }

  function renderLearnProfile(session, profile) {
    const loading = document.getElementById("learnProfileLoading");
    const guest = document.getElementById("learnProfileGuest");
    const errorBox = document.getElementById("learnProfileError");
    const content = document.getElementById("learnProfileContent");
    if (!loading || !guest || !errorBox || !content) return;

    loading.hidden = true;
    guest.hidden = true;
    errorBox.hidden = true;
    content.hidden = true;

    if (!session || !session.user || !session.user.id) {
      guest.hidden = false;
      return;
    }

    const state = window.VEXDYN_LEARN_PROGRESS;
    if (!state || state.userId !== session.user.id || state.status !== "ready") {
      const errorText = document.getElementById("learnProfileErrorText");
      if (errorText) {
        errorText.textContent = state && state.error
          ? "We couldn't load your cloud Learn progress. No progress has been estimated or replaced."
          : "Your cloud Learn progress is not ready yet. Refresh and try again.";
      }
      errorBox.hidden = false;
      return;
    }

    const identity = getProfileIdentity(session, profile);
    const completedByCourse = state.completedByCourse || {};
    const courseStats = COURSES.map((course) => {
      const completed = Array.isArray(completedByCourse[course.id])
        ? completedByCourse[course.id].slice()
        : [];
      const completedCount = completed.length;
      const percentage = Math.round((completedCount / course.lessons) * 100);
      return {
        course,
        completed,
        completedCount,
        percentage,
        status: statusFromProgress(percentage),
        nextLesson: firstIncompleteLesson(course, completed)
      };
    });

    const completedTotal = courseStats.reduce((sum, stat) => sum + stat.completedCount, 0);
    const overallPercentage = TOTAL_LESSONS ? Math.round((completedTotal / TOTAL_LESSONS) * 100) : 0;

    const avatar = document.getElementById("learnProfileAvatar");
    const name = document.getElementById("learnProfileName");
    const username = document.getElementById("learnProfileUsername");
    const email = document.getElementById("learnProfileEmail");
    const overallPct = document.getElementById("learnProfileOverallPct");
    const overallBar = document.getElementById("learnProfileOverallBar");
    const completedCount = document.getElementById("learnProfileCompletedCount");
    const totalCount = document.getElementById("learnProfileTotalCount");
    const overallState = document.getElementById("learnProfileOverallState");

    if (avatar) avatar.textContent = identity.initials;
    if (name) name.textContent = identity.fullName;
    if (username) username.textContent = identity.username ? "@" + identity.username : "";
    if (email) email.textContent = identity.email || "";
    if (overallPct) overallPct.textContent = overallPercentage + "%";
    if (overallBar) overallBar.style.width = overallPercentage + "%";
    if (completedCount) completedCount.textContent = String(completedTotal);
    if (totalCount) totalCount.textContent = String(TOTAL_LESSONS);
    if (overallState) {
      overallState.textContent = overallPercentage === 0
        ? "NOT STARTED"
        : overallPercentage >= 100 ? "COMPLETED" : "IN PROGRESS";
    }

    const coursesEl = document.getElementById("learnProfileCourses");
    if (coursesEl) {
      coursesEl.innerHTML = courseStats.map((stat) => {
        const stateLabel = stat.percentage >= 100
          ? "COMPLETED"
          : stat.percentage > 0 ? "IN PROGRESS" : "NOT STARTED";

        const actionLabel = stat.percentage >= 100
          ? "Completed Course"
          : stat.nextLesson
            ? "Continue Learning"
            : "Open Course";

        return `
          <article class="learn-profile-course" data-profile-course="${stat.course.id}">
            <div class="learn-profile-course-head">
              <div>
                <span class="learn-profile-course-kicker">${stat.course.category || "COURSE"}</span>
                <h3>${stat.course.title}</h3>
              </div>
              <span class="learn-profile-course-state">${stateLabel}</span>
            </div>

            <div class="learn-profile-course-meta">
              <span>${stat.completedCount}/${stat.course.lessons} lessons</span>
              <strong>${stat.percentage}%</strong>
            </div>

            <div class="learn-profile-course-bar" aria-hidden="true">
              <span style="width:${stat.percentage}%"></span>
            </div>

            <button
              class="learn-profile-course-action"
              type="button"
              data-profile-course-action="${stat.course.id}"
              data-profile-lesson="${stat.nextLesson || ""}"
              ${stat.percentage >= 100 ? "disabled" : ""}
            >${actionLabel}</button>
          </article>
        `;
      }).join("");
    }

    const achievements = document.getElementById("learnProfileAchievements");
    if (achievements) {
      achievements.innerHTML = `
        <div class="learn-profile-achievement-placeholder">
          <span class="learn-profile-achievement-icon" aria-hidden="true">✦</span>
          <div>
            <strong>Achievements</strong>
            <p>Achievement tracking will appear here when its existing VEXDYN Learn support is available.</p>
          </div>
        </div>
      `;
    }

    content.hidden = false;
  }

  async function loadLearnProfile() {
    const auth = window.vexdynAuth;
    const loading = document.getElementById("learnProfileLoading");
    const guest = document.getElementById("learnProfileGuest");
    const errorBox = document.getElementById("learnProfileError");
    const content = document.getElementById("learnProfileContent");

    if (loading) loading.hidden = false;
    if (guest) guest.hidden = true;
    if (errorBox) errorBox.hidden = true;
    if (content) content.hidden = true;

    if (!auth || !auth.ready || !auth.client) {
      if (guest) {
        guest.hidden = false;
        guest.textContent = "Sign in to view your VEXDYN Learn profile.";
      }
      return;
    }

    let session;
    try {
      session = await auth.ready;
    } catch (error) {
      console.error("VEXDYN Learn Profile: authentication state could not be resolved.", error);
      if (errorBox) errorBox.hidden = false;
      return;
    }

    if (!session || !session.user || !session.user.id) {
      renderLearnProfile(null, null);
      return;
    }

    let profile = null;

    try {
      const { data, error } = await auth.client
        .from("profiles")
        .select("full_name,username")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.warn("VEXDYN Learn Profile: profiles lookup failed; using safe account metadata fallback.", error);
      } else {
        profile = data || null;
      }
    } catch (error) {
      console.warn("VEXDYN Learn Profile: profiles lookup failed; using safe account metadata fallback.", error);
    }

    const progressState = window.VEXDYN_LEARN_PROGRESS;

    if (
      !progressState ||
      progressState.userId !== session.user.id ||
      progressState.status !== "ready"
    ) {
      await loadAuthenticatedLearnProgress();
    }

    const latestProgress = window.VEXDYN_LEARN_PROGRESS;
    if (
      !latestProgress ||
      latestProgress.userId !== session.user.id ||
      latestProgress.status !== "ready"
    ) {
      renderLearnProfile(session, profile);
      return;
    }

    renderLearnProfile(session, profile);
  }

  function bindLearnProfileActions() {
    document.addEventListener("click", function (event) {
      const action = event.target.closest("[data-profile-course-action]");
      if (!action) return;

      const courseId = action.getAttribute("data-profile-course-action");
      const lessonNumber = Number(action.getAttribute("data-profile-lesson"));

      if (!courseId) return;

      if (Number.isInteger(lessonNumber) && lessonNumber > 0) {
        openProfileCourseLesson(courseId, lessonNumber);
      } else {
        const cta = document.querySelector(
          '[data-course-cta][data-id="' + courseId + '"]'
        );
        if (cta) cta.click();
      }
    });

    const profileLink = document.querySelector("[data-open-learn-profile]");
    if (profileLink) {
      profileLink.addEventListener("click", function (event) {
        event.preventDefault();
        const profileSection = document.getElementById("learnProfile");
        if (profileSection) {
          profileSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        loadLearnProfile();
      });
    }
  }

  function bindLearnProfileAuthChanges() {
    const auth = window.vexdynAuth;
    if (!auth || !auth.client || !auth.client.auth) return;

    auth.client.auth.onAuthStateChange(function (event, session) {
      if (
        event === "SIGNED_OUT" ||
        event === "USER_UPDATED" ||
        event === "SIGNED_IN"
      ) {
        window.VEXDYN_LEARN_PROGRESS = {
          status: "loading",
          userId: session && session.user ? session.user.id : null,
          completedByCourse: { html: [], css: [], javascript: [], react: [] },
          error: null
        };

        COURSES.forEach((course) => {
          course.progress = 0;
          course.status = statusFromProgress(0);
        });

        updateJourney(COURSES);

        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          setTimeout(loadLearnProfile, 0);
        } else {
          renderLearnProfile(null, null);
        }

        renderCourses();
      }
    });
  }

  function initLearn() {
    const filterInput = document.getElementById("courseSearch");
    const filterBtns = Array.from(document.querySelectorAll("[data-course-filter]"));

    renderCourses();
    bindCourseFilters();

    if (filterInput) {
      filterInput.addEventListener("input", applyFilter);
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.courseFilter || "all";
        applyFilter();
      });
    });

    document.addEventListener("click", (e) => {
      const cta = e.target.closest("[data-course-cta]");
      if (!cta) return;
      const id = cta.getAttribute("data-id");
      // Fallback openers if dedicated scripts missed the event
      if (id === "css") {
        e.preventDefault();
        const catalog = document.getElementById("learnCatalog");
        const cssCourse = document.getElementById("cssCourseView");
        const cssLesson = document.getElementById("cssLessonView");
        const htmlCourse = document.getElementById("htmlCourseView");
        const htmlLesson = document.getElementById("htmlLessonView");
        if (catalog) catalog.hidden = true;
        if (htmlCourse) htmlCourse.hidden = true;
        if (htmlLesson) htmlLesson.hidden = true;
        if (cssLesson) cssLesson.hidden = true;
        const jsCourse = document.getElementById("jsCourseView");
        const jsLesson = document.getElementById("jsLessonView");
        if (jsCourse) jsCourse.hidden = true;
        if (jsLesson) jsLesson.hidden = true;
        if (cssCourse) {
          cssCourse.hidden = false;
          // Ask css-course.js to render list if available
          if (window.VEXDYN_CSS_COURSE && typeof window.VEXDYN_CSS_COURSE.renderCourseList === "function") {
            window.VEXDYN_CSS_COURSE.renderCourseList();
          } else {
            // dispatch a custom event the course script listens for
            document.dispatchEvent(new CustomEvent("vexdyn-open-css-course"));
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (id === "html") {
        e.preventDefault();
        const catalog = document.getElementById("learnCatalog");
        const htmlCourse = document.getElementById("htmlCourseView");
        const htmlLesson = document.getElementById("htmlLessonView");
        const cssCourse = document.getElementById("cssCourseView");
        const cssLesson = document.getElementById("cssLessonView");
        const jsCourse = document.getElementById("jsCourseView");
        const jsLesson = document.getElementById("jsLessonView");
        if (catalog) catalog.hidden = true;
        if (cssCourse) cssCourse.hidden = true;
        if (cssLesson) cssLesson.hidden = true;
        if (jsCourse) jsCourse.hidden = true;
        if (jsLesson) jsLesson.hidden = true;
        if (htmlLesson) htmlLesson.hidden = true;
        if (htmlCourse) {
          htmlCourse.hidden = false;
          if (window.VEXDYN_HTML_COURSE && typeof window.VEXDYN_HTML_COURSE.renderCourseList === "function") {
            window.VEXDYN_HTML_COURSE.renderCourseList();
          } else {
            document.dispatchEvent(new CustomEvent("vexdyn-open-html-course"));
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (id === "javascript") {
        e.preventDefault();
        const catalog = document.getElementById("learnCatalog");
        const htmlCourse = document.getElementById("htmlCourseView");
        const htmlLesson = document.getElementById("htmlLessonView");
        const cssCourse = document.getElementById("cssCourseView");
        const cssLesson = document.getElementById("cssLessonView");
        const jsCourse = document.getElementById("jsCourseView");
        const jsLesson = document.getElementById("jsLessonView");
        if (catalog) catalog.hidden = true;
        if (htmlCourse) htmlCourse.hidden = true;
        if (htmlLesson) htmlLesson.hidden = true;
        if (cssCourse) cssCourse.hidden = true;
        if (cssLesson) cssLesson.hidden = true;
        if (jsLesson) jsLesson.hidden = true;
        const reactCourse = document.getElementById("reactCourseView");
        const reactLesson = document.getElementById("reactLessonView");
        if (reactCourse) reactCourse.hidden = true;
        if (reactLesson) reactLesson.hidden = true;
        if (jsCourse) {
          jsCourse.hidden = false;
          if (window.VEXDYN_JS_COURSE && typeof window.VEXDYN_JS_COURSE.renderCourseList === "function") {
            window.VEXDYN_JS_COURSE.renderCourseList();
          } else if (window.VEXDYN_JS_COURSE && typeof window.VEXDYN_JS_COURSE.openJsCourse === "function") {
            window.VEXDYN_JS_COURSE.openJsCourse();
          } else {
            document.dispatchEvent(new CustomEvent("vexdyn-open-js-course"));
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (id === "react") {
        e.preventDefault();
        const catalog = document.getElementById("learnCatalog");
        ["htmlCourseView","htmlLessonView","cssCourseView","cssLessonView","jsCourseView","jsLessonView","reactLessonView"].forEach((vid) => {
          const el = document.getElementById(vid);
          if (el) el.hidden = true;
        });
        if (catalog) catalog.hidden = true;
        const reactCourse = document.getElementById("reactCourseView");
        if (reactCourse) {
          reactCourse.hidden = false;
          if (window.VEXDYN_REACT_COURSE && typeof window.VEXDYN_REACT_COURSE.renderCourseList === "function") {
            window.VEXDYN_REACT_COURSE.renderCourseList();
          } else if (window.VEXDYN_REACT_COURSE && typeof window.VEXDYN_REACT_COURSE.openReactCourse === "function") {
            window.VEXDYN_REACT_COURSE.openReactCourse();
          } else {
            document.dispatchEvent(new CustomEvent("vexdyn-open-react-course"));
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      const notice = document.getElementById("courseNotice");
      if (notice) {
        notice.hidden = false;
        notice.textContent = "HTML, CSS, JavaScript, and React are available in VEXDYN Learn.";
        setTimeout(() => { notice.hidden = true; }, 3200);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindLearnProfileActions();
    bindLearnProfileAuthChanges();
    initLearn();
  });

  // Expose for Build 2
  
  function animateCatalogProgress() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(document.querySelectorAll("#courseGrid .course-card[data-course-id]"));
    if (!cards.length) return;

    cards.forEach(function (card, index) {
      const fill = card.querySelector("[data-progress-fill]");
      const num = card.querySelector("[data-progress-num]");
      if (!fill) return;

      var target = parseFloat(fill.getAttribute("data-target-progress") || "0");
      if (isNaN(target)) target = 0;
      target = Math.max(0, Math.min(100, target));

      // Reset visual display to 0 without touching stored progress
      fill.style.transition = "none";
      fill.style.width = "0%";
      if (num) num.textContent = "0%";
      // Force reflow so the browser registers the 0% state
      void fill.offsetWidth;

      var delay = reduce ? 0 : index * 180;
      var duration = reduce ? 0 : (target <= 15 ? 1100 : target <= 55 ? 1400 : 1650);

      setTimeout(function () {
        if (reduce || duration === 0) {
          fill.style.width = target + "%";
          if (num) num.textContent = Math.round(target) + "%";
          return;
        }

        var t0 = performance.now();
        function frame(now) {
          var t = Math.min(1, (now - t0) / duration);
          // easeOutCubic
          var eased = 1 - Math.pow(1 - t, 3);
          var val = target * eased;
          fill.style.width = val + "%";
          if (num) num.textContent = Math.round(val) + "%";
          if (t < 1) {
            requestAnimationFrame(frame);
          } else {
            fill.style.width = target + "%";
            if (num) num.textContent = Math.round(target) + "%";
          }
        }
        requestAnimationFrame(frame);
      }, delay);
    });

    // Journey / overall tracker numbers if present
    var journeyPct = document.querySelectorAll("[data-journey-pct]");
    journeyPct.forEach(function (el, i) {
      var target = parseFloat(el.getAttribute("data-target-progress") || el.textContent) || 0;
      if (reduce) {
        el.textContent = Math.round(target) + "%";
        return;
      }
      el.textContent = "0%";
      var delay = 80 + i * 120;
      var duration = 1300;
      setTimeout(function () {
        var t0 = performance.now();
        function frame(now) {
          var t = Math.min(1, (now - t0) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + "%";
          if (t < 1) requestAnimationFrame(frame);
          else el.textContent = Math.round(target) + "%";
        }
        requestAnimationFrame(frame);
      }, delay);
    });
  }

  window.VEXDYN_LEARN = { COURSES, statusFromProgress, updateJourney, renderCourses, animateCatalogProgress, loadAuthenticatedLearnProgress, applyAuthenticatedProgress, saveAuthenticatedLessonCompletion, isAuthenticatedLearnUser };
  // Step-back support for Learn views
  window.addEventListener("popstate", function (e) {
    if (!e.state || !e.state.vexdynLearn) return;
    var catalog = document.getElementById("learnCatalog");
    var views = ["htmlCourseView","htmlLessonView","cssCourseView","cssLessonView","jsCourseView","jsLessonView","reactCourseView","reactLessonView"];
    if (e.state.vexdynLearn === "catalog") {
      views.forEach(function (id) { var el = document.getElementById(id); if (el) el.hidden = true; });
      if (catalog) catalog.hidden = false;
      if (typeof animateCatalogProgress === "function") setTimeout(animateCatalogProgress, 100);
    }
  });

})();
