import { c as create_ssr_component, e as escape, d as add_attribute, v as validate_component, b as subscribe, f as each } from "../../../chunks/index.js";
import { u as user } from "../../../chunks/supabase.js";
import { w as writable } from "../../../chunks/index2.js";
import "postcss";
import "jszip";
const NoteItem_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "p.svelte-1pfdzei{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}",
  map: null
};
function formatNote(str) {
  if (!str)
    return "";
  return str.slice(0, 50);
}
function formateDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(void 0, {
    weekday: "short",
    month: "short",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}
const NoteItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a;
  let { note: note2 } = $$props;
  let lines = (_a = note2.text) == null ? void 0 : _a.split("\n");
  let taskAmount = 0;
  let tasksDone = 0;
  if ($$props.note === void 0 && $$bindings.note && note2 !== void 0)
    $$bindings.note(note2);
  $$result.css.add(css$5);
  {
    {
      if (note2.text) {
        tasksDone = lines.filter((item) => item.startsWith("- [x]")).length;
        taskAmount = tasksDone + lines.filter((item) => item.startsWith("- [ ]")).length;
      }
    }
  }
  return `<div class="${"text-left"}"><h5 class="${"font-medium"}">${escape(note2.title)}</h5>

	<p class="${"text-sm svelte-1pfdzei"}">${escape(formatNote(note2.text))}</p>

	
	${taskAmount > 0 && tasksDone == 0 ? `<p class="${"svelte-1pfdzei"}">${escape(taskAmount)} tasks</p>` : `${taskAmount > 0 && taskAmount == tasksDone ? `<p class="${"svelte-1pfdzei"}">${escape(taskAmount)} tasks done</p>` : `${tasksDone > 0 && taskAmount > 0 ? `<p class="${"svelte-1pfdzei"}">${escape(tasksDone)} of ${escape(taskAmount)} tasks</p>` : ``}`}`}

	<time class="${"text-xs"}"${add_attribute("datetime", new Date(note2.updated_at).toISOString(), 0)}>Modified ${escape(formateDate(note2.updated_at))}</time>
</div>`;
});
let note = writable(
  {}
);
let notes = writable([]);
let tags = writable(
  []
);
let tagFolders = writable(
  []
);
let noteTags = writable([]);
const showNavigation = writable(false);
const showNotes = writable(true);
const showEditor = writable(false);
const IconBase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} viewBox="${"0 0 24 24"}" fill="${"none"}" stroke="${"currentColor"}" stroke-width="${"2"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}">${slots.default ? slots.default({}) : ``}</svg>`;
});
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<polyline points="${"9 18 15 12 9 6"}"></polyline>`;
    }
  })}`;
});
const Download = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<path d="${"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}"></path>
	<polyline points="${"7 10 12 15 17 10"}"></polyline>
	<line x1="${"12"}" y1="${"15"}" x2="${"12"}" y2="${"3"}"></line>`;
    }
  })}`;
});
const FileText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<path d="${"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}"></path><polyline points="${"14 2 14 8 20 8"}"></polyline>
	<line x1="${"16"}" y1="${"13"}" x2="${"8"}" y2="${"13"}"></line>
	<line x1="${"16"}" y1="${"17"}" x2="${"8"}" y2="${"17"}"></line>
	<polyline points="${"10 9 9 9 8 9"}"></polyline>`;
    }
  })}`;
});
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<polygon points="${"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"}"></polygon>`;
    }
  })}`;
});
const GitHub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("width", size, 0)}${add_attribute("height", size, 0)} shape-rendering="${"geometricPrecision"}" text-rendering="${"geometricPrecision"}" image-rendering="${"optimizeQuality"}" fill-rule="${"evenodd"}" clip-rule="${"evenodd"}" viewBox="${"0 0 640 640"}"><path d="${"M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"}"></path></svg>`;
});
const Hash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<line x1="${"4"}" y1="${"9"}" x2="${"20"}" y2="${"9"}"></line>
	<line x1="${"4"}" y1="${"15"}" x2="${"20"}" y2="${"15"}"></line>
	<line x1="${"10"}" y1="${"3"}" x2="${"8"}" y2="${"21"}"></line>
	<line x1="${"16"}" y1="${"3"}" x2="${"14"}" y2="${"21"}"></line>`;
    }
  })}`;
});
const Inbox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<polyline points="${"22 12 16 12 14 15 10 15 8 12 2 12"}"></polyline>
	<path d="${"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}"></path>`;
    }
  })}`;
});
const MoreHorizontal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<circle cx="${"12"}" cy="${"12"}" r="${"1"}"></circle>
	<circle cx="${"19"}" cy="${"12"}" r="${"1"}"></circle>
	<circle cx="${"5"}" cy="${"12"}" r="${"1"}"></circle>`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<line x1="${"12"}" y1="${"5"}" x2="${"12"}" y2="${"19"}"></line>
	<line x1="${"5"}" y1="${"12"}" x2="${"19"}" y2="${"12"}"></line>`;
    }
  })}`;
});
const Save = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<path d="${"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"}"></path><polyline points="${"17 21 17 13 7 13 7 21"}"></polyline>
	<polyline points="${"7 3 7 8 15 8"}"></polyline>`;
    }
  })}`;
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<circle cx="${"11"}" cy="${"11"}" r="${"8"}"></circle>
	<line x1="${"21"}" y1="${"21"}" x2="${"16.65"}" y2="${"16.65"}"></line>`;
    }
  })}`;
});
const Sliders = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<line x1="${"4"}" y1="${"21"}" x2="${"4"}" y2="${"14"}"></line>
	<line x1="${"4"}" y1="${"10"}" x2="${"4"}" y2="${"3"}"></line>
	<line x1="${"12"}" y1="${"21"}" x2="${"12"}" y2="${"12"}"></line>

	<line x1="${"12"}" y1="${"8"}" x2="${"12"}" y2="${"3"}"></line>
	<line x1="${"20"}" y1="${"21"}" x2="${"20"}" y2="${"16"}"></line>
	<line x1="${"20"}" y1="${"12"}" x2="${"20"}" y2="${"3"}"></line>

	<line x1="${"1"}" y1="${"14"}" x2="${"7"}" y2="${"14"}"></line>
	<line x1="${"9"}" y1="${"8"}" x2="${"15"}" y2="${"8"}"></line>
	<line x1="${"17"}" y1="${"16"}" x2="${"23"}" y2="${"16"}"></line>`;
    }
  })}`;
});
const Trash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<polyline points="${"3 6 5 6 21 6"}"></polyline>
	<path d="${"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}"></path>
	<line x1="${"10"}" y1="${"11"}" x2="${"10"}" y2="${"17"}"></line>
	<line x1="${"14"}" y1="${"11"}" x2="${"14"}" y2="${"17"}"></line>`;
    }
  })}`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<path d="${"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}"></path>
	<circle cx="${"12"}" cy="${"7"}" r="${"4"}"></circle>`;
    }
  })}`;
});
const NoteList_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".items__list.svelte-10nmggi.svelte-10nmggi{overflow:hidden}.items__list.svelte-10nmggi ul.svelte-10nmggi{overflow-y:auto}@media(min-width: 768px){.items__head.svelte-10nmggi .burger.svelte-10nmggi{display:none}}",
  map: null
};
const NoteList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $noteStore, $$unsubscribe_noteStore;
  let $notes, $$unsubscribe_notes;
  let $$unsubscribe_user;
  let $$unsubscribe_showNavigation;
  let $$unsubscribe_showNotes;
  let $$unsubscribe_showEditor;
  let $$unsubscribe_noteTags;
  $$unsubscribe_noteStore = subscribe(note, (value) => $noteStore = value);
  $$unsubscribe_notes = subscribe(notes, (value) => $notes = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_showNavigation = subscribe(showNavigation, (value) => value);
  $$unsubscribe_showNotes = subscribe(showNotes, (value) => value);
  $$unsubscribe_showEditor = subscribe(showEditor, (value) => value);
  $$unsubscribe_noteTags = subscribe(noteTags, (value) => value);
  $$result.css.add(css$4);
  $$unsubscribe_noteStore();
  $$unsubscribe_notes();
  $$unsubscribe_user();
  $$unsubscribe_showNavigation();
  $$unsubscribe_showNotes();
  $$unsubscribe_showEditor();
  $$unsubscribe_noteTags();
  return `
<div class="${"items h-full flex flex-col bg-slate-50 relative"}"><div class="${"items__head flex flex-col px-4 py-2 svelte-10nmggi"}"><div class="${"flex justify-between items-center"}"><h3 class="${"text-xl font-semibold"}">Notes</h3>

			<div><button title="${"Filter notes"}">${validate_component(Filter, "Filter").$$render($$result, { size: 24 }, {}, {})}</button>

				<button title="${"Create a new note"}">${validate_component(Plus, "Plus").$$render($$result, { size: 24 }, {}, {})}</button></div></div>

		<button class="${"burger svelte-10nmggi"}">Burger</button>

		<div class="${"flex border rounded-full bg-white px-2 py-1"}"><label for="${"search"}" class="${"mr-2"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}</label>

			<input id="${"search"}" type="${"text"}" placeholder="${"search"}" class="${"outline-none"}"></div></div>

	<div class="${"items__list flex h-full max-h-full relative svelte-10nmggi"}">${$notes.length > 1 ? `<ul class="${"flex flex-col h-full w-full svelte-10nmggi"}">${each($notes, (note2) => {
    return `<li class="${[
      "border-l-2 border-solid",
      ($noteStore.id === note2.id ? "border-indigo-700" : "") + " " + ($noteStore.id !== note2.id ? "border-transparent" : "")
    ].join(" ").trim()}"><button class="${"w-full p-4 border-b border-solid"}">${validate_component(NoteItem, "NoteItem").$$render($$result, { note: note2 }, {}, {})}</button>
					</li>`;
  })}</ul>` : `
			<p>no notes</p>`}</div>
</div>`;
});
const easymde = "";
const PopoutMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const placement = "bottom";
  const extraOpts = {
    modifiers: [
      {
        name: "offset",
        options: { offset: [0, 8] }
      }
    ]
  };
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.extraOpts === void 0 && $$bindings.extraOpts && extraOpts !== void 0)
    $$bindings.extraOpts(extraOpts);
  return `<div class="${"relative leading-[0]"}"><button>${slots.icon ? slots.icon({}) : `
			${validate_component(MoreHorizontal, "MoreHorizontal").$$render($$result, {}, {}, {})}
		`}</button>

	${``}
</div>`;
});
const Cross = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { size = 24 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return `${validate_component(IconBase, "IconBase").$$render($$result, { size }, {}, {
    default: () => {
      return `<line x1="${"18"}" y1="${"6"}" x2="${"6"}" y2="${"18"}"></line>
	<line x1="${"6"}" y1="${"6"}" x2="${"18"}" y2="${"18"}"></line>`;
    }
  })}`;
});
const TagChip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_noteTags;
  $$unsubscribe_noteTags = subscribe(noteTags, (value) => value);
  let { tag = {} } = $$props;
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  $$unsubscribe_noteTags();
  return `<div class="${"flex flex-row items-center pl-2 gap-1 rounded bg-blue-300"}"><span>${escape(tag.name)}</span>
	<button class="${"bg-inherit p-1 rounded hover:bg-blue-500 hover:text-white"}">${validate_component(Cross, "Cross").$$render($$result, { size: 16 }, {}, {})}</button>
</div>`;
});
const Note_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "button.svelte-1dw2cgh{white-space:nowrap}@media(min-width: 768px){.back-button.svelte-1dw2cgh{display:none}}",
  map: null
};
const Note = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $noteTags, $$unsubscribe_noteTags;
  let $note, $$unsubscribe_note;
  let $$unsubscribe_user;
  let $$unsubscribe_tags;
  let $$unsubscribe_notes;
  let $$unsubscribe_showNotes;
  let $$unsubscribe_showEditor;
  let $$unsubscribe_showNavigation;
  $$unsubscribe_noteTags = subscribe(noteTags, (value) => $noteTags = value);
  $$unsubscribe_note = subscribe(note, (value) => $note = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_tags = subscribe(tags, (value) => value);
  $$unsubscribe_notes = subscribe(notes, (value) => value);
  $$unsubscribe_showNotes = subscribe(showNotes, (value) => value);
  $$unsubscribe_showEditor = subscribe(showEditor, (value) => value);
  $$unsubscribe_showNavigation = subscribe(showNavigation, (value) => value);
  const extraOpts = {
    modifiers: [
      {
        name: "offset",
        options: { offset: [0, 0] }
      }
    ]
  };
  let searchString = "";
  let searchResults = [];
  let searchIndex = -1;
  let editor;
  note.subscribe((value) => {
  });
  if ($$props.extraOpts === void 0 && $$bindings.extraOpts && extraOpts !== void 0)
    $$bindings.extraOpts(extraOpts);
  $$result.css.add(css$3);
  $$unsubscribe_noteTags();
  $$unsubscribe_note();
  $$unsubscribe_user();
  $$unsubscribe_tags();
  $$unsubscribe_notes();
  $$unsubscribe_showNotes();
  $$unsubscribe_showEditor();
  $$unsubscribe_showNavigation();
  return `<div class="${"h-full w-full flex flex-col overflow-y-hidden bg-gray-100 note"}"><div class="${"flex flex-row gap-4 justify-between items-center flex-wrap px-4 "}">
		<div class="${"w-full"}"><div class="${"flex flex-row justify-between mb-2"}"><div><button class="${"back-button mr-2 svelte-1dw2cgh"}">back
					</button>

					<label for="${"title"}" class="${"hidden"}">Title</label>
					<input id="${"title"}" type="${"text"}" class="${"text-lg"}"${add_attribute("value", $note.title, 0)}></div>

				<div class="${"flex flex-row items-center gap-2"}">${validate_component(PopoutMenu, "PopoutMenu").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="${"flex flex-col bg-slate-300 py-2"}">
							<button class="${"flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 svelte-1dw2cgh"}" title="${"Save note"}">${validate_component(Save, "Save").$$render($$result, {}, {}, {})}
								<span>(Force) save</span></button>

							<button class="${"flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 svelte-1dw2cgh"}">${validate_component(Download, "Download").$$render($$result, { size: 20 }, {}, {})}
								<span>Download</span></button>
							<button class="${"flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 text-yellow-400 svelte-1dw2cgh"}">${validate_component(Inbox, "Inbox").$$render($$result, { size: 20 }, {}, {})}
								<span>Archive</span></button>
							<button class="${"flex flex-row items-center gap-2 w-full px-4 py-1 hover:bg-slate-400 text-red-600 svelte-1dw2cgh"}">${validate_component(Trash, "Trash").$$render($$result, { size: 20 }, {}, {})}
								<span>Delete</span></button></div>`;
    }
  })}</div></div>

			<div class="${"flex flex-row flex-wrap"}"><ul class="${"flex flex-row flex-wrap"}">${each($noteTags, (tag) => {
    return `<li class="${"mr-2"}">${validate_component(TagChip, "TagChip").$$render($$result, { tag }, {}, {})}
						</li>`;
  })}</ul>

				
				<input id="${"title"}" type="${"text"}" placeholder="${"tag"}" class="${"border-b-2 border-blue-400"}"${add_attribute("value", searchString, 0)}>

				${searchResults.length > 0 ? `<ul class="${"z-10 bg-slate-400"}">${each(searchResults, (option, i) => {
    return `<li class="${[
      "bg-slate-400 hover:bg-slate-300 ",
      searchIndex === i ? "bg-slate-200" : ""
    ].join(" ").trim()}"><button class="${"px-4 py-1 svelte-1dw2cgh"}">
									${escape(option.tag)}</button>
							</li>`;
  })}</ul>` : ``}</div></div></div>

	<div class="${"h-full"}"><textarea${add_attribute("this", editor, 0)}></textarea></div>
</div>`;
});
const Tag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<span class="${"flex flex-row items-center gap-1 pl-4 hover:bg-indigo-600"}"><div>${validate_component(Hash, "Hash").$$render($$result, { size: "14" }, {}, {})}</div>
	<div>${escape(name)}</div>
</span>`;
});
const TagFolder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { expanded = true } = $$props;
  let { name } = $$props;
  let { tags: tags2 } = $$props;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.tags === void 0 && $$bindings.tags && tags2 !== void 0)
    $$bindings.tags(tags2);
  return `<span class="${[
    "flex flex-row items-center pl-4 font-bold cursor-pointer hover:bg-indigo-600",
    expanded ? "expanded" : ""
  ].join(" ").trim()}"><span${add_attribute("style", expanded ? "transform:rotate(90deg)" : "", 0)} class="${"origin-center"}">${validate_component(ChevronDown, "ChevronDown").$$render($$result, { size: "16" }, {}, {})}</span>
	<span>${validate_component(Hash, "Hash").$$render($$result, { size: "14" }, {}, {})}</span>
	<span>${escape(name)}</span></span>

${expanded ? `<ul class="${"ml-5 border-l border-solid border-slate-100"}">${each(tags2, (tag) => {
    return `<li class="${"py-0.5"}">${tag.tags && tag.tags.length > 0 ? `${validate_component(TagFolder, "svelte:self").$$render($$result, Object.assign(tag), {}, {})}` : `${validate_component(Tag, "Tag").$$render($$result, Object.assign(tag), {}, {})}`}
			</li>`;
  })}</ul>` : ``}`;
});
const Tags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $tagFolders, $$unsubscribe_tagFolders;
  let $$unsubscribe_user;
  $$unsubscribe_tagFolders = subscribe(tagFolders, (value) => $tagFolders = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_tagFolders();
  $$unsubscribe_user();
  return `<div class="${"w-64"}"><div class="${"flex flex-row justify-between px-4"}"><h3 class="${"font-bold font-lg"}">Tags</h3>

		<button title="${"Add new tag"}">${validate_component(Plus, "Plus").$$render($$result, { size: 20 }, {}, {})}</button></div>

	<ul>${``}

		${each($tagFolders, (tag) => {
    return `<li>
				${tag.tags && tag.tags.length > 0 ? `${validate_component(TagFolder, "TagFolder").$$render(
      $$result,
      {
        name: tag.name,
        tags: tag.tags,
        expanded: true
      },
      {},
      {}
    )}` : `${validate_component(Tag, "Tag").$$render($$result, { name: tag.name }, {}, {})}`}
			</li>`;
  })}</ul>
</div>`;
});
const Sidebar_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "ul.svelte-z09a8q.svelte-z09a8q{margin-bottom:1.25rem}li.svelte-z09a8q.svelte-z09a8q{margin-bottom:0.25rem}li.svelte-z09a8q button.svelte-z09a8q{display:flex;flex-direction:row}li.svelte-z09a8q span.svelte-z09a8q{margin-left:0.5rem}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_showNotes;
  let $$unsubscribe_showNavigation;
  let $$unsubscribe_showEditor;
  $$unsubscribe_showNotes = subscribe(showNotes, (value) => value);
  $$unsubscribe_showNavigation = subscribe(showNavigation, (value) => value);
  $$unsubscribe_showEditor = subscribe(showEditor, (value) => value);
  $$result.css.add(css$2);
  $$unsubscribe_showNotes();
  $$unsubscribe_showNavigation();
  $$unsubscribe_showEditor();
  return `

<div class="${"h-full py-4"}"><h3 class="${"font-bold font-lg px-4 mb-2"}">Views</h3>

	<ul class="${"flex flex-col svelte-z09a8q"}"><li class="${"svelte-z09a8q"}"><button class="${"w-full px-4 py-1 hover:bg-slate-400 svelte-z09a8q"}">${validate_component(FileText, "FileText").$$render($$result, {}, {}, {})}
				<span class="${"svelte-z09a8q"}">Notes</span></button></li>
		<li class="${"svelte-z09a8q"}"><button class="${"w-full px-4 py-1 hover:bg-slate-400 svelte-z09a8q"}">${validate_component(Hash, "Hash").$$render($$result, {}, {}, {})}
				<span class="${"svelte-z09a8q"}">Untaged</span></button></li>
		<li class="${"svelte-z09a8q"}"><button class="${"w-full px-4 py-1 hover:bg-slate-400 svelte-z09a8q"}">${validate_component(Inbox, "Inbox").$$render($$result, {}, {}, {})}
				<span class="${"svelte-z09a8q"}">Archived</span></button></li>
		<li class="${"svelte-z09a8q"}"><button class="${"w-full px-4 py-1 hover:bg-slate-400 svelte-z09a8q"}">${validate_component(Trash, "Trash").$$render($$result, {}, {}, {})}
				<span class="${"svelte-z09a8q"}">Deleted</span></button></li></ul>

	${validate_component(Tags, "Tags").$$render($$result, {}, {}, {})}

	<div class="${"md:hidden"}"><button>&lt; Back</button>
		
		
		</div>
</div>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "footer.svelte-133lyzl{display:none}@media(min-width: 768px){footer.svelte-133lyzl{display:flex}}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_notes;
  let $$unsubscribe_note;
  let $user, $$unsubscribe_user;
  $$unsubscribe_notes = subscribe(notes, (value) => value);
  $$unsubscribe_note = subscribe(note, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$result.css.add(css$1);
  $$unsubscribe_notes();
  $$unsubscribe_note();
  $$unsubscribe_user();
  return `<footer class="${"md:flex items-center gap-2 h-8 px-2 bg-slate-500 svelte-133lyzl"}">${validate_component(PopoutMenu, "PopoutMenu").$$render($$result, { placement: "top" }, {}, {
    icon: () => {
      return `${validate_component(User, "UserIcon").$$render($$result, { slot: "icon" }, {}, {})}`;
    },
    default: () => {
      var _a;
      return `${$user && ($user != void 0 || $user != null) ? `<h3>Account</h3>
			<p>You are signed in as:</p>
			<p>${escape($user == null ? void 0 : $user.email)}</p>
			<p>Using: ${escape((_a = $user == null ? void 0 : $user.app_metadata) == null ? void 0 : _a.provider)}</p>

			<button class="${"hover:text-purple-600"}">Logout</button>` : `<button class="${"flex flex-row items-center gap-2 px-2 py-1"}">${validate_component(GitHub, "GitHub").$$render($$result, {}, {}, {})}

				<span class="${"w-max"}">Login with Github</span></button>`}`;
    }
  })}

	${validate_component(PopoutMenu, "PopoutMenu").$$render($$result, { placement: "top" }, {}, {
    icon: () => {
      return `${validate_component(Sliders, "Sliders").$$render($$result, { slot: "icon" }, {}, {})}`;
    },
    default: () => {
      return `<button class="${"flex flex-row gap-2 w-max"}">${validate_component(Download, "Download").$$render($$result, {}, {}, {})}
			<span>Download all notes</span></button>`;
    }
  })}
</footer>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-f0kppz{height:100vh;min-height:100vh;position:relative}.layout.svelte-f0kppz{display:flex;flex-direction:column}@media(max-width: 768px){.navigation.svelte-f0kppz,.items.svelte-f0kppz,.editor.svelte-f0kppz{height:100vh;min-height:100vh;position:relative}.navigation.svelte-f0kppz:not(.selected),.items.svelte-f0kppz:not(.selected),.editor.svelte-f0kppz:not(.selected){visibility:hidden;height:0;min-height:0}}@media(min-width: 768px){.layout.svelte-f0kppz{display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto;height:calc(var(--viewport-height, 100vh) - 2rem)}.navigation.svelte-f0kppz,.items.svelte-f0kppz,.editor.svelte-f0kppz{height:100%;max-height:100%;min-height:0px;display:flex;position:relative}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_tagFolders;
  let $$unsubscribe_tags;
  let $showNavigation, $$unsubscribe_showNavigation;
  let $showNotes, $$unsubscribe_showNotes;
  let $showEditor, $$unsubscribe_showEditor;
  $$unsubscribe_tagFolders = subscribe(tagFolders, (value) => value);
  $$unsubscribe_tags = subscribe(tags, (value) => value);
  $$unsubscribe_showNavigation = subscribe(showNavigation, (value) => $showNavigation = value);
  $$unsubscribe_showNotes = subscribe(showNotes, (value) => $showNotes = value);
  $$unsubscribe_showEditor = subscribe(showEditor, (value) => $showEditor = value);
  $$result.css.add(css);
  $$unsubscribe_tagFolders();
  $$unsubscribe_tags();
  $$unsubscribe_showNavigation();
  $$unsubscribe_showNotes();
  $$unsubscribe_showEditor();
  return `<div class="${"app svelte-f0kppz"}"><div class="${"layout svelte-f0kppz"}"><div class="${["navigation bg-slate-300 svelte-f0kppz", $showNavigation ? "selected" : ""].join(" ").trim()}">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}</div>
		<div class="${["items h-full svelte-f0kppz", $showNotes ? "selected" : ""].join(" ").trim()}">${validate_component(NoteList, "NoteList").$$render($$result, {}, {}, {})}</div>
		<div class="${["editor svelte-f0kppz", $showEditor ? "selected" : ""].join(" ").trim()}">
			${validate_component(Note, "Note").$$render($$result, {}, {}, {})}</div></div>

	${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Page as default
};
