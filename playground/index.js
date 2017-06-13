'use strict';

import * as PIXI from 'pixi.js'
import crash from 'crash'

let logo;
const loader = new PIXI.loaders.Loader();
loader.add(['./assets/pixi_v5.png']);
loader.load(()=>{

	console.log(crash);

	//const crash = new Crash.World();

	logo = new PIXI.Sprite.from('./assets/pixi_v5.png');
	logo.anchor.set(1);

	app.stage.addChild(logo);

	app.ticker.add(()=>{

		// add some code here!
		//crash.update();
	});

	resize(window.innerWidth, window.innerHeight);
});

function resize(w, h)
{
	app.renderer.resize(w, h);

	if(logo)
	{
		logo.x = w - 25;
		logo.y = h - 20;
	}
}
// resize with logo..
window.addEventListener('resize', ()=>{

	resize(window.innerWidth, window.innerHeight);

});

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {resolution:window.devicePixelRatio, autoResize:true, backgroundColor:0x333333})

document.body.appendChild(app.renderer.view);
document.body.style.margin = 0;
//budo index.js --live -- -t babelify