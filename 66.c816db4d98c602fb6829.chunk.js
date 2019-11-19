(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{356:function(n,e,a){"use strict";a.r(e),e.default='<p>This guide contains some useful tips for improving build/compilation performance.</p>\n<hr>\n<h2 id="general">General<a href="#general" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The following best practices should help, whether you\'re running build scripts in <a href="/guides/development">development</a> or <a href="/guides/production">production</a>.</p>\n<h3 id="stay-up-to-date">Stay Up to Date<a href="#stay-up-to-date" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Use the latest webpack version. We are always making performance improvements. The latest stable version of webpack is:</p>\n<p><a href="https://github.com/webpack/webpack/releases"><img src="https://img.shields.io/npm/v/webpack.svg?label=webpack&#x26;style=flat-square&#x26;maxAge=3600" alt="latest webpack version"></a></p>\n<p>Staying up-to-date with <strong>Node.js</strong>  can also help with performance. On top of this, keeping your package manager (e.g. <code>npm</code> or <code>yarn</code>) up-to-date can also help. Newer versions create more efficient module trees and increase resolving speed.</p>\n<h3 id="loaders">Loaders<a href="#loaders" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Apply loaders to the minimal number of modules necessary. Instead of:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'babel-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Use the <code>include</code> field to only apply the loader modules that actually need to be transformed by it:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n        include<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'src\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'babel-loader\'</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="bootstrap">Bootstrap<a href="#bootstrap" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Each additional loader/plugin has a bootup time. Try to use as few tools as possible.</p>\n<h3 id="resolving">Resolving<a href="#resolving" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>The following steps can increase resolving speed:</p>\n<ul>\n<li>Minimize the number of items in <code>resolve.modules</code>, <code>resolve.extensions</code>, <code>resolve.mainFiles</code>, <code>resolve.descriptionFiles</code>, as they increase the number of filesystem calls.</li>\n<li>Set <code>resolve.symlinks: false</code> if you don\'t use symlinks (e.g. <code>npm link</code> or <code>yarn link</code>).</li>\n<li>Set <code>resolve.cacheWithContext: false</code> if you use custom resolving plugins, that are not context specific.</li>\n</ul>\n<h3 id="dlls">Dlls<a href="#dlls" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Use the <code>DllPlugin</code> to move code that is changed less often into a separate compilation. This will improve the application\'s compilation speed, although it does increase complexity of the build process.</p>\n<h3 id="smaller--faster">Smaller = Faster<a href="#smaller--faster" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Decrease the total size of the compilation to increase build performance. Try to keep chunks small.</p>\n<ul>\n<li>Use fewer/smaller libraries.</li>\n<li>Use the <code>SplitChunksPlugin</code> in Multi-Page Applications.</li>\n<li>Use the <code>SplitChunksPlugin</code> in <code>async</code> mode in Multi-Page Applications.</li>\n<li>Remove unused code.</li>\n<li>Only compile the part of the code you are currently developing on.</li>\n</ul>\n<h3 id="worker-pool">Worker Pool<a href="#worker-pool" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>The <code>thread-loader</code> can be used to offload expensive loaders to a worker pool.</p>\n<blockquote class="warning">\n<p>Don\'t use too many workers, as there is a boot overhead for the Node.js runtime and the loader. Minimize the module transfers between worker and main process. IPC is expensive.</p>\n</blockquote>\n<h3 id="persistent-cache">Persistent cache<a href="#persistent-cache" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Enable persistent caching with the <code>cache-loader</code>. Clear cache directory on <code>"postinstall"</code> in <code>package.json</code>.</p>\n<h3 id="custom-pluginsloaders">Custom plugins/loaders<a href="#custom-pluginsloaders" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Profile them to not introduce a performance problem here.</p>\n<h3 id="progress-plugin">Progress plugin<a href="#progress-plugin" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>It is possible to shorten build times by removing <code>progress-plugin</code> from webpack\'s configuration. Keep in mind, <code>progress-plugin</code> might not provide as much value for fast builds as well, so make sure you are leveraging the benefits of using it.</p>\n<hr>\n<h2 id="development">Development<a href="#development" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The following steps are especially useful in <em>development</em>.</p>\n<h3 id="incremental-builds">Incremental Builds<a href="#incremental-builds" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Use webpack\'s watch mode. Don\'t use other tools to watch your files and invoke webpack. The built-in watch mode will keep track of timestamps and passes this information to the compilation for cache invalidation.</p>\n<p>In some setups, watching falls back to polling mode. With many watched files, this can cause a lot of CPU load. In these cases, you can increase the polling interval with <code>watchOptions.poll</code>.</p>\n<h3 id="compile-in-memory">Compile in Memory<a href="#compile-in-memory" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>The following utilities improve performance by compiling and serving assets in memory rather than writing to disk:</p>\n<ul>\n<li><code>webpack-dev-server</code></li>\n<li><code>webpack-hot-middleware</code></li>\n<li><code>webpack-dev-middleware</code></li>\n</ul>\n<h3 id="statstojson-speed">stats.toJson speed<a href="#statstojson-speed" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack 4 outputs a large amount of data with its <code>stats.toJson()</code> by default. Avoid retrieving portions of the <code>stats</code> object unless necessary in the incremental step. <code>webpack-dev-server</code> after v3.1.3 contained a substantial performance fix to minimize the amount of data retrieved from the <code>stats</code> object per incremental build step.</p>\n<h3 id="devtool">Devtool<a href="#devtool" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Be aware of the performance differences between the different <code>devtool</code> settings.</p>\n<ul>\n<li><code>"eval"</code> has the best performance, but doesn\'t assist you for transpiled code.</li>\n<li>The <code>cheap-source-map</code> variants are more performant if you can live with the slightly worse mapping quality.</li>\n<li>Use a <code>eval-source-map</code> variant for incremental builds.</li>\n</ul>\n<p>=> In most cases, <code>cheap-module-eval-source-map</code> is the best option.</p>\n<h3 id="avoid-production-specific-tooling">Avoid Production Specific Tooling<a href="#avoid-production-specific-tooling" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Certain utilities, plugins, and loaders only make sense when building for production. For example, it usually doesn\'t make sense to minify and mangle your code with the <code>TerserPlugin</code> while in development. These tools should typically be excluded in development:</p>\n<ul>\n<li><code>TerserPlugin</code></li>\n<li><code>ExtractTextPlugin</code></li>\n<li><code>[hash]</code>/<code>[chunkhash]</code></li>\n<li><code>AggressiveSplittingPlugin</code></li>\n<li><code>AggressiveMergingPlugin</code></li>\n<li><code>ModuleConcatenationPlugin</code></li>\n</ul>\n<h3 id="minimal-entry-chunk">Minimal Entry Chunk<a href="#minimal-entry-chunk" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack only emits updated chunks to the filesystem. For some configuration options, (HMR, <code>[name]</code>/<code>[chunkhash]</code> in <code>output.chunkFilename</code>, <code>[hash]</code>) the entry chunk is invalidated in addition to the changed chunks.</p>\n<p>Make sure the entry chunk is cheap to emit by keeping it small. The following code block extracts a chunk containing only the runtime with <em>all other chunks as children</em>:</p>\n<pre><code class="hljs language-js"><span class="token keyword">new</span> <span class="token class-name">CommonsChunkPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'manifest\'</span><span class="token punctuation">,</span>\n  minChunks<span class="token punctuation">:</span> <span class="token number">Infinity</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h3 id="avoid-extra-optimization-steps">Avoid Extra Optimization Steps<a href="#avoid-extra-optimization-steps" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, but can be costly in larger ones:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  optimization<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    removeAvailableModules<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    removeEmptyChunks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    splitChunks<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="output-without-path-info">Output Without Path Info<a href="#output-without-path-info" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules. Turn this off in the <code>options.output.pathinfo</code> setting:</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    pathinfo<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3 id="nodejs-versions-8910-9111">Node.js Versions 8.9.10-9.11.1<a href="#nodejs-versions-8910-9111" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>There was a <a href="https://github.com/nodejs/node/issues/19769">performance regression</a> in Node.js versions 8.9.10 - 9.11.1 in the ES2015 <code>Map</code> and <code>Set</code> implementations. webpack uses those data structures liberally, so this regression affects compile times.</p>\n<p>Earlier and later Node.js versions are not affected.</p>\n<h3 id="typescript-loader">TypeScript Loader<a href="#typescript-loader" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Recently, <code>ts-loader</code> has started to consume the internal TypeScript watch mode APIs which dramatically decreases the number of modules to be rebuilt on each iteration. This <code>experimentalWatchApi</code> shares the same logic as the normal TypeScript watch mode itself and is quite stable for development use. Turn on <code>transpileOnly</code>, as well, for even faster incremental builds.</p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  test<span class="token punctuation">:</span> <span class="token regex">/\\.tsx?$/</span><span class="token punctuation">,</span>\n  use<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      loader<span class="token punctuation">:</span> <span class="token string">\'ts-loader\'</span><span class="token punctuation">,</span>\n      options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        transpileOnly<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        experimentalWatchApi<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>Note: the <code>ts-loader</code> documentation suggests the use of <code>cache-loader</code>, but this actually slows the incremental builds down with disk writes.</p>\n<p>To gain typechecking again, use the <a href="https://www.npmjs.com/package/fork-ts-checker-webpack-plugin"><code>ForkTsCheckerWebpackPlugin</code></a>.</p>\n<p>There is a <a href="https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin">full example</a> on the ts-loader github repository.</p>\n<hr>\n<h2 id="production">Production<a href="#production" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The following steps are especially useful in <em>production</em>.</p>\n<blockquote class="warning">\n<p><strong>Don\'t sacrifice the quality of your application for small performance gains!</strong> Keep in mind that optimization quality is, in most cases, more important than build performance.</p>\n</blockquote>\n<h3 id="multiple-compilations">Multiple Compilations<a href="#multiple-compilations" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>When using multiple compilations, the following tools can help:</p>\n<ul>\n<li><a href="https://github.com/trivago/parallel-webpack"><code>parallel-webpack</code></a>: It allows for compilation in a worker pool.</li>\n<li><code>cache-loader</code>: The cache can be shared between multiple compilations.</li>\n</ul>\n<h3 id="source-maps">Source Maps<a href="#source-maps" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>Source maps are really expensive. Do you really need them?</p>\n<hr>\n<h2 id="specific-tooling-issues">Specific Tooling Issues<a href="#specific-tooling-issues" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The following tools have certain problems that can degrade build performance:</p>\n<h3 id="babel">Babel<a href="#babel" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<ul>\n<li>Minimize the number of preset/plugins</li>\n</ul>\n<h3 id="typescript">TypeScript<a href="#typescript" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<ul>\n<li>Use the <code>fork-ts-checker-webpack-plugin</code> for typechecking in a separate process.</li>\n<li>Configure loaders to skip typechecking.</li>\n<li>Use the <code>ts-loader</code> in <code>happyPackMode: true</code> / <code>transpileOnly: true</code>.</li>\n</ul>\n<h3 id="sass">Sass<a href="#sass" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<ul>\n<li><code>node-sass</code> has a bug which blocks threads from the Node.js thread pool. When using it with the <code>thread-loader</code> set <code>workerParallelJobs: 2</code>.</li>\n</ul>\n'}}]);