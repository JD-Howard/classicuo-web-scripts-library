# classicuo-web-script-library
Collection of Typescript for automating tasks in the ClassicUO web client.

**NOTE:** If you are not inherently a programmer then the overall intent of this library may not be initially clear. I will get it evolved, cleaned up and detailed soon, but I traveling and wanted to get the basic infrastructure posted before I left for while.


## Justification
The Classic UO web interface actually has an impressive editor. However, it is still difficult to write complex scripts, lacks meaningful organization and doesn't enable sufficient code management/debugging/distribution. The purpose of this project is to enabled productive develop outside of the web UI editor and diminish the impact of those deficiencies.


## General
This was largely configured to use the free IDE VSCode, but should get some intelligence in many other editors. The `./types` folder contains and enables editor IDEs to provide better coding experience. Unless you intend on providing Pull Requests to this project, then there really isn't a reason to edit anything the types folder. 

If you are building ClassicUO web client Typescript and intend to contribute back to the project, then do all of your work `./scripts` folder. 

If you are wanting to use pre-developed scripts, then you will need to copy the text from this project into your ClassicUO web client editor; read Code Context section for important context. Should you find ways to make existing scripts more universal, more complete, or have developed something useful/new, then please submit a PR. 

**NOTE:** also interested in collaborating on complex scripts and will accept PRs for unfinished concepts if they are located in the `./scripts/experimental/` folder. However, unfinished work needs to document all of the intent, what works, and what doesn't work in code comments.


## Code Context
In this GitHub project, we have the ability to "organize" scripts into sub-folders, but the Classic UO interface has no such ability. With that said, many of the "scripts" created in this project depend on the `_library.ts` file for support objects, functions and enums. You will likely need to make a script in the Classic UO editor named "_library" and copy all of the contents from this projects `_library.ts` file into that client script of the same name. 

Another byproduct of sub-folder organization is that scripts in this project reference the shared library like this:
`import * as lib from '../_library';`

When you copy a script to your Classic UO editor, you'll need to get rid of the double dot and use a single dot; like this:
`import * as lib from './_library';`

I like to add this line to task scripts so it can help identify when the library is not available:
```typescript
try { lib.Helper.loaded(); console.clear(); } 
catch { client.headMsg('Script library is not loaded', player, 44); exit(); }
```


## Contributions
Generally, the scripts folder contains "universal" scripts. IE, copy/paste and it should work with at most the `_library.ts` dependency also being created in UOC. With that said, there are a few folders with some nuance:

- *~/scripts/experimental/* - Used for collaboration work that is not fully tested, incomplete, or requires additional help to finish.
  - The *_playground.ts* file is a generic file you can play around in and no PRs will be accepted that change this file.
- *~/scripts/manual/* - This folder contains scripts that might have variables that MUST be configured with a relevant serial or other options.
- *~/types/* - This folder helps power the intelligence of Visual Studio Code and does absolutely nothing beyond that. Occasionally an interface is defined to help create intelligence, but is not necessarily valid in the UOC editor. So, make sure you don't type *~/script/` variables with types that only exist in this project; all of which *should* be annotated with JSDOC text.

## Disclaimer
This project is not associated with any other Classic UO projects.

- Content may become broken through future Classic UO developments. Please submit PRs to correct problems you find.
- Types were initially generated using the UO Classic documentation and DeepSeek. If DS generated something objectional or potentially violates licensing, then please submit an issue with a takedown request.

