import{_ as e,c as a,o as r,a3 as t}from"./chunks/framework.7ep0oyv4.js";const d=JSON.parse('{"title":"Programs","description":"","frontmatter":{},"headers":[],"relativePath":"docs/concepts/programs.md","filePath":"docs/concepts/programs.md"}'),o={name:"docs/concepts/programs.md"},s=t('<h1 id="programs" tabindex="-1">Programs <a class="header-anchor" href="#programs" aria-label="Permalink to &quot;Programs&quot;">​</a></h1><p>Programs are the agents that decide what signing requests get signed. More concretely, they are <a href="https://github.com/WebAssembly/component-model" target="_blank" rel="noreferrer">WebAssembly components</a> that implement an Entropy-specific <a href="https://github.com/entropyxyz/programs/blob/master/wit/application.wit" target="_blank" rel="noreferrer">interface</a>. The only function a user must manually implement is <code>evaluate</code>, which takes the user&#39;s signature request as input and returns as successful or an error. If no error is returned, then the message in the signature request will be signed using the program&#39;s corrosponding keypair with the specified hashing algorithm.</p><h2 id="custom-hashing" tabindex="-1">Custom Hashing <a class="header-anchor" href="#custom-hashing" aria-label="Permalink to &quot;Custom Hashing&quot;">​</a></h2><p>As ECDSA schemes sign 256-bit numbers, programs can include a <code>custom_hash</code> function so users can utilize less common hashing functions. In its simplest form, the function converts a signature request (which also contains the message) into a 256-bit number.</p><p>An example of a custom hash implementation can be found <a href="https://github.com/entropyxyz/programs/tree/master/examples/custom-hash" target="_blank" rel="noreferrer">here</a>.</p><p>The list of supported natively-supported hashing algorithms can be found <a href="https://github.com/entropyxyz/entropy-core/blob/master/crates/shared/src/types.rs#L101" target="_blank" rel="noreferrer">here</a>.</p><h2 id="program-configs" tabindex="-1">Program Configs <a class="header-anchor" href="#program-configs" aria-label="Permalink to &quot;Program Configs&quot;">​</a></h2><p>Programs can include a configuration, or config, which allow users to modify the <code>evaluation</code> behavior without having to recompile and upload a new program to the chain. The format of this is undefined, allowing for a config to be defined as a serialized C-compatible struct, UTF-8 JSON string, or anything in between.</p><p>An example of a program that uses a config can be found <a href="https://github.com/entropyxyz/programs/blob/master/examples/basic-transaction/src/lib.rs#L18" target="_blank" rel="noreferrer">here</a>. In this example, the user specifies an allow-list of Ethereum recipients via a JSON string config.</p><h2 id="auxiliary-data" tabindex="-1">Auxiliary Data <a class="header-anchor" href="#auxiliary-data" aria-label="Permalink to &quot;Auxiliary Data&quot;">​</a></h2><p>Programs can require users to include auxiliary data, separate from the message, in their signature request.</p><p>An example of a program that requires a zero-knowledge proof as auxiliary data can be found <a href="https://github.com/entropyxyz/programs/blob/master/examples/risczero-zkvm-verification/src/lib.rs#L24" target="_blank" rel="noreferrer">here</a>.</p><h2 id="future-updates" tabindex="-1">Future Updates <a class="header-anchor" href="#future-updates" aria-label="Permalink to &quot;Future Updates&quot;">​</a></h2><p>Just like <a href="https://wasi.dev/" target="_blank" rel="noreferrer">WASI</a>, additional runtime functions and features (eg. oracles) will be added via <a href="https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md" target="_blank" rel="noreferrer">WITs</a>. The user will import them via <a href="https://github.com/entropyxyz/programs/tree/main/core" target="_blank" rel="noreferrer">entropy-programs-core</a> and the newly compiled program will be able to interact with the new Wasm runtime functions. Any additional features will be implemented following the existing <a href="https://github.com/WebAssembly/WASI/blob/main/Proposals.md" target="_blank" rel="noreferrer">WASI proposals</a> or new WITs will be defined.</p>',14),n=[s];function i(l,h,c,m,p,u){return r(),a("div",null,n)}const f=e(o,[["render",i]]);export{d as __pageData,f as default};
