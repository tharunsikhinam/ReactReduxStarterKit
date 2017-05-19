FALCON UI

Here are the list of UI pages done using this repository
1) Fleet Management System
2) COD Fund Transfer
3) Gati - Generate Manifest 
4) COD ledger

Instructions to setup and use the repository.
Make sure the latest versions of node and npm are installed. 
Clone the repository and in the root directory of the app.

1.Install all node packages
>npm install

2.Start the application in dev mode. 
>npm start 

The Application runs on localhost:3002 

localhost:3002/show -> Home Page

localhost:3002/bundle -> bundled javascript file (use this in as script src in FMS project)

Example: 
<script src="http://localhost:3002/bundle"  type="text/javascript"></script>

3.Go to src/index.js and choose which component has to be rendered.
All components are mentioned in index.js files, comment out the component that needs to be used and mount it on an appropriate div id in the HTML file.

Example:
<code>
/*
//Gati Generate Manifest Page
ReactDOM.render(<GenerateManifest/>,document.getElementById("appTest"));
*/

/*
//Fleet management system. 
let store = configureStore();
ReactDOM.render (  
 <MuiThemeProvider >
  <Provider store={store}>
   <MapHome/>
  </Provider>
 </MuiThemeProvider>,document.getElementById('appTest'));
*/
</code>

4.(.babelrc configuration for Hot Module Reloading)
In dev mode
.babelrc 
<code>
{
  "presets": ["react", "es2015","stage-2"],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
</code>

In prod mode
<code>
{
  "presets": ["react", "es2015","stage-2"]
}
</code>
 

Production
1.To build and generate the compiled javascript file.
>npm run build

bundle.js is generated in dist folder. Copy this file in TMS project, under public/javascripts/<filename>.js
Include this file in the HTML
Example:
 <script src="@assets.RemoteAssets.getUrl("javascripts/<filename>.js")" type="text/javascript"></script>


