define([
	'esri/units',
	'esri/geometry/Extent',
	'esri/config',
	'esri/tasks/GeometryService',
	'esri/layers/ImageParameters'
], function (units, Extent, esriConfig, GeometryService, ImageParameters) {

	// url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
	esriConfig.defaults.io.proxyUrl = 'proxy/proxy.ashx';
	esriConfig.defaults.io.alwaysUseProxy = false;
	// url to your geometry server.
	esriConfig.defaults.geometryService = new GeometryService('http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

	//image parameters for dynamic services, set to png32 for higher quality exports.
	var imageParameters = new ImageParameters();
	imageParameters.format = 'png32';

	return {
		// used for debugging your app
		isDebug: false,

		//default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
		defaultMapClickMode: 'identify',
		// map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
		mapOptions: {
			basemap: 'osm',
			center: [-95.366577,	29.773502],
			zoom: 10,
			sliderStyle: 'small'
		},
		// panes: {
		// 	left: {
		// 		splitter: true
		// 	},
		// 	right: {
		// 		id: 'sidebarRight',
		// 		placeAt: 'outer',
		// 		region: 'right',
		// 		splitter: true,
		// 		collapsible: true
		// 	},
		// 	bottom: {
		// 		id: 'sidebarBottom',
		// 		placeAt: 'outer',
		// 		splitter: true,
		// 		collapsible: true,
		// 		region: 'bottom'
		// 	},
		// 	top: {
		// 		id: 'sidebarTop',
		// 		placeAt: 'outer',
		// 		collapsible: true,
		// 		splitter: true,
		// 		region: 'top'
		// 	}
		// },
		// collapseButtonsPane: 'center', //center or outer

		// operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
		// The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
		// 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
		operationalLayers: [{
			type: 'feature',
			url: 'http://services3.arcgis.com/5y1dsBktpYbLnFYi/ArcGIS/rest/services/LRTStations/FeatureServer/0',
			title: 'Station',
			options: {
				id: 'Station',
				opacity: 1.0,
				visible: true,
				outFields: ['*'],
				mode: 0
			},
			editorLayerInfos: {
				disableGeometryUpdate: false
			}
		}, {
			type: 'feature',
			url: 'http://services3.arcgis.com/5y1dsBktpYbLnFYi/ArcGIS/rest/services/RNTransitCentersRoutes/FeatureServer/0',
			title: 'Transit Center',
			options: {
				id: 'TrancitCenter',
				opacity: 1.0,
				visible: true,
				outFields: ['*'],
				mode: 0
			}
		},  {
           	type: 'feature',
         	url: 'http://services3.arcgis.com/5y1dsBktpYbLnFYi/ArcGIS/rest/services/RedRoutes/FeatureServer/0',
           	title: 'Major Throughfare',
         	options: {
           		id: 'MajorThroughfare',
           		opacity: 1.0,
           		visible: true,
           		outFields: ['*'],
                mode: 0
           	}

        }, {
			type: 'feature',
			url: 'http://services.arcgis.com/JJw3JVXIwKh5JI42/ArcGIS/rest/services/Railroads_NAD83/FeatureServer/0',
			title: 'Railroad',
			options: {
				id: 'Railroad',
				opacity: 1.0,
				visible: true,
				outFields: ['*'],
                mode: 0
			}

		}, {
           			type: 'dynamic',
           			url: 'http://services.nationalmap.gov/arcgis/rest/services/structures/MapServer',
           			title: 'Structures',
           			options: {
           				id: 'Structures',
           				opacity: 1.0,
           				visible: true,
           				outFields: ['*'],
                           mode: 0
           			},
           			identifyLayerInfos: {
           				layerIds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
           			}
         }, {
                    type: 'feature',
                    url: 'http://services.arcgis.com/omeYiuZkRQY6NhLn/ArcGIS/rest/services/Evacuation_Routes_Features/FeatureServer/0',
                    title: 'Evacuation Routes',
                    options: {
                          id: 'EvacuationRoutes',
                          opacity: 1.0,
                          visible: true,
                          outFields: ['*'],
                          mode: 0
                      },
          },{
			type: 'feature',
			url: 'http://services3.arcgis.com/5y1dsBktpYbLnFYi/ArcGIS/rest/services/FlexZones/FeatureServer/0',
			title: 'Flex Zone',
			options: {
				id: 'FlexZone',
				opacity: 1.0,
				outFields: ['*'],
                mode: 0
			},
			layerControlLayerInfos: {
				swipe: true,
				metadataUrl: true
			}
		}],
		// set include:true to load. For titlePane type set position the the desired order in the sidebar
		widgets: {
			growler: {
				include: true,
				id: 'growler',
				type: 'domNode',
				path: 'gis/dijit/Growler',
				srcNodeRef: 'growlerDijit',
				options: {}
			},
			geocoder: {
				include: true,
				id: 'geocoder',
				type: 'domNode',
				path: 'gis/dijit/Geocoder',
				srcNodeRef: 'geocodeDijit',
				options: {
					map: true,
					mapRightClickMenu: true,
					geocoderOptions: {
						autoComplete: true,
						arcgisGeocoder: {
							placeholder: 'Enter an address or place'
						}
					}
				}
			},
			identify: {
				include: true,
				id: 'identify',
				type: 'invisible',
				path: 'gis/dijit/Identify',
				title: 'Identify',
				open: false,
				position: 20,
				options: 'config/identify'
			},
			basemaps: {
				include: true,
				id: 'basemaps',
				type: 'domNode',
				path: 'gis/dijit/Basemaps',
				srcNodeRef: 'basemapsDijit',
				options: 'config/basemaps'
			},
			mapInfo: {
				include: false,
				id: 'mapInfo',
				type: 'domNode',
				path: 'gis/dijit/MapInfo',
				srcNodeRef: 'mapInfoDijit',
				options: {
					map: true,
					mode: 'dms',
					firstCoord: 'y',
					unitScale: 3,
					showScale: true,
					xLabel: '',
					yLabel: '',
					minWidth: 286
				}
			},
			scalebar: {
				include: true,
				id: 'scalebar',
				type: 'map',
				path: 'esri/dijit/Scalebar',
				options: {
					map: true,
					attachTo: 'bottom-left',
					scalebarStyle: 'line',
					scalebarUnit: 'dual'
				}
			},
			locateButton: {
				include: true,
				id: 'locateButton',
				type: 'domNode',
				path: 'gis/dijit/LocateButton',
				srcNodeRef: 'locateButton',
				options: {
					map: true,
					publishGPSPosition: true,
					highlightLocation: true,
					useTracking: true,
					geolocationOptions: {
						maximumAge: 0,
						timeout: 15000,
						enableHighAccuracy: true
					}
				}
			},
			overviewMap: {
				include: true,
				id: 'overviewMap',
				type: 'map',
				path: 'esri/dijit/OverviewMap',
				options: {
					map: true,
					attachTo: 'bottom-right',
					color: '#0000CC',
					height: 100,
					width: 125,
					opacity: 0.30,
					visible: false
				}
			},
			//homeButton: {
			//	include: true,
			//	id: 'homeButton',
			//	type: 'domNode',
			//	path: 'esri/dijit/HomeButton',
			//	srcNodeRef: 'homeButton',
			//	options: {
			//		map: true,
			//		extent: new Extent({
			//			xmin: -96,
			//			ymin: 30,
			//			xmax: -94,
			//	        ymax: 28,
			//			spatialReference: {
			//				wkid: 4326
			//			}
			//		})
			//	}
			//},
			legend: {
				include: true,
				id: 'legend',
				type: 'titlePane',
				path: 'esri/dijit/Legend',
				title: 'Legend',
				open: false,
				position: 0,
				options: {
					map: true,
					legendLayerInfos: true
				}
			},
			layerControl: {
				include: true,
				id: 'layerControl',
				type: 'titlePane',
				path: 'gis/dijit/LayerControl',
				title: 'Layers',
				open: false,
				position: 0,
				options: {
					map: true,
					layerControlLayerInfos: true,
					separated: true,
					vectorReorder: true,
					overlayReorder: true
				}
			},
			bookmarks: {
				include: true,
				id: 'bookmarks',
				type: 'titlePane',
				path: 'gis/dijit/Bookmarks',
				title: 'Bookmarks',
				open: false,
				position: 2,
				options: 'config/bookmarks'
			},
			find: {
				include: true,
				id: 'find',
				type: 'titlePane',
				canFloat: true,
				path: 'gis/dijit/Find',
				title: 'Find',
				open: false,
				position: 3,
				options: 'config/find'
			},
			draw: {
				include: true,
				id: 'draw',
				type: 'titlePane',
				canFloat: true,
				path: 'gis/dijit/Draw',
				title: 'Draw',
				open: false,
				position: 4,
				options: {
					map: true,
					mapClickMode: true
				}
			},
			measure: {
				include: true,
				id: 'measurement',
				type: 'titlePane',
				canFloat: true,
				path: 'gis/dijit/Measurement',
				title: 'Measurement',
				open: false,
				position: 5,
				options: {
					map: true,
					mapClickMode: true,
					defaultAreaUnit: units.SQUARE_MILES,
					defaultLengthUnit: units.MILES
				}
			},
			print: {
				include: true,
				id: 'print',
				type: 'titlePane',
				canFloat: true,
				path: 'gis/dijit/Print',
				title: 'Print',
				open: false,
				position: 19,
				options: {
					map: true,
					printTaskURL: 'https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
					copyrightText: 'Copyright 2014',
					authorText: 'Me',
					defaultTitle: 'Viewer Map',
					defaultFormat: 'PDF',
					defaultLayout: 'Letter ANSI A Landscape'
				}
			},
			directions: {
				include: true,
				id: 'directions',
				type: 'titlePane',
				path: 'gis/dijit/Directions',
				title: 'Directions',
				open: false,
				position: 7,
				options: {
					map: true,
					mapRightClickMenu: true,
					options: {
						routeTaskUrl: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route',
						routeParams: {
							directionsLanguage: 'en-US',
							directionsLengthUnits: units.MILES
						}
					}
				}
			},
			editor: {
				include: true,
				id: 'editor',
				type: 'titlePane',
				path: 'gis/dijit/Editor',
				title: 'Editor',
				open: false,
				position: 8,
				options: {
					map: true,
					mapClickMode: true,
					editorLayerInfos: true,
					settings: {
						toolbarVisible: true,
						showAttributesOnClick: true,
						enableUndoRedo: true,
						createOptions: {
							polygonDrawTools: ['freehandpolygon', 'autocomplete']
						},
						toolbarOptions: {
							reshapeVisible: true,
							cutVisible: true,
							mergeVisible: true
						}
					}
				}
			},
			streetview: {
				include: true,
				id: 'streetview',
				type: 'titlePane',
				canFloat: true,
				position: 6,
				path: 'gis/dijit/StreetView',
				title: 'Google Street View',
				options: {
					map: true,
					mapClickMode: true,
					mapRightClickMenu: true
				}
			},
			help: {
				include: true,
				id: 'help',
				type: 'floating',
				path: 'gis/dijit/Help',
				title: 'Help',
				options: {}
			}

		}
	};
});