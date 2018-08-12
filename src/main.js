'use strict';
(function() {
	// global variables



	// called once on page load
	var init = function() {

	};

	// called automatically on article page resize
	window.onResize = function(width) {

	};

	// called when the graphic enters the viewport
	window.enterView = function() {

	};


	// graphic code
	var endDate = new Date();
	var minutes = endDate.getUTCMinutes();//getUTCMinutes(0, 0, 0);
	endDate.setUTCMinutes(minutes - (minutes % 10));

	var myMap = L.map('map', {
	    zoom: 7,
	    fullscreenControl: true,
	    timeDimension: true,
	    timeDimensionControl: true,
	    timeDimensionOptions:{
				timeInterval: "PT8H/" + endDate.toISOString(),
			 	period: "PT1H"
	        // timeInterval: "PT4H/" + endDate.toISOString(),
	        // period: "PT4M"
					// ,
	        // currentTime: endDate.getTime()
	    },

	    timeDimensionControlOptions: {
	        autoPlay: false,
	        playerOptions: {
	            buffer: 10,
	            transitionTime: 250,
	            loop: true,
	        }
	    },
	    center: [38.0, -90.50],
	});

	myMap.setView([42.0547291,-71.803867], 7);
	myMap.scrollWheelZoom.disable();

	var mapTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap contributors, © CartoDB'
	});

	mapTiles.addTo(myMap);

	var wmsUrl = "https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer"
	var radarWMS = L.nonTiledLayer.wms(wmsUrl, {
	    layers: '1',
	    format: 'image/png',
	    transparent: true,
	    opacity: 0.8,
	    attribution: 'nowCOAST'
	});

	var proxy = 'server/proxy.php';
	var testTimeLayer = L.timeDimension.layer.wms(radarWMS, {
	    proxy: proxy,
	    updateTimeDimension: false,
	    wmsVersion: '1.3.0'
	});
	testTimeLayer.addTo(myMap);










	// run code
	init();
})();
