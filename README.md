FALCON UI

Here are the list of UI pages done using this repository
1) Fleet Management System
2) COD Fund Transfer
3) Gati - Generate Manifest 
4) COD ledger

Instructions to setup and use the repository.<br/>
Make sure the latest versions of node and npm are installed. <br/>
Clone the repository and in the root directory of the app.<br/>
<br/>
<br/>
1.Install all node packages
<br/>
>npm install

2.Start the application in dev mode. <br/>

>npm start 

The Application runs on localhost:3002 <br/>

localhost:3002/show -> Home Page<br/>
localhost:3002/bundle -> bundled javascript file (use this in as script src in FMS project)<br/>
<br/>

Example: 
<br/>

<code>&lt;script src="http://localhost:3002/bundle"  type="text/javascript"&gt;&lt;/script&gt;</code>

3.Go to src/index.js and choose which component has to be rendered.
All components are mentioned in index.js files, comment out the component that needs to be used and mount it on an appropriate div id in the HTML file.

Example:
<code>
/*
//Gati Generate Manifest Page
ReactDOM.render(&lt;GenerateManifest/&gt;,document.getElementById("appTest"));
*/

/*
//Fleet management system. 
let store = configureStore();
ReactDOM.render (  &lt;MuiThemeProvider &gt;
  &lt;Provider store={store}&gt;
   &lt;MapHome/&gt;
  &lt;/Provider&gt;
 &lt;/MuiThemeProvider&gt; ,document.getElementById('appTest'));
*/
</code>
<br/>
<br/>
4.(.babelrc configuration for Hot Module Reloading)
In dev mode
.babelrc  
<br/>
<code>
{<br/>
  "presets": ["react", "es2015","stage-2"],<br/>
  "env": {<br/>
    "development": {<br/>
      "presets": ["react-hmre"]<br/>
    }<br/>
  }<br/>
}<br/>
</code>
<br/>
<br/>
In prod mode
<code>
{<br/>
  "presets": ["react", "es2015","stage-2"]<br/>
}<br/>
</code>
 

Production<br/>

1.To build and generate the compiled javascript file.<br/>
>npm run build
<br/>
<br/>
bundle.js is generated in dist folder. Copy this file in TMS project, under public/javascripts/&lt;filename&gt;.js
<br/>
Include this file in the HTML
Example:
 &lt;script src="@assets.RemoteAssets.getUrl("javascripts/<filename>.js")" type="text/javascript"&gt;&lt;/script&gt;


