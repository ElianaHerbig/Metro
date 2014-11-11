
define({
	map: true,
	queries: [
		{
			description: 'Find a medical center',
			url: 'http://services.nationalmap.gov/arcgis/rest/services/structures/MapServer',
			layerIds: [3],
			searchFields: ['OBJECTID','FCODE', 'NAME','FTYPE'],
			minChars: 2
		},
		{
			description: '',
			url: 'http://199.119.176.43/arcgis/rest/services/MUD71_SDE_v4/MapServer',
			layerIds: [3],
			searchFields: ['Document'],
			minChars: 1
		}
	]
});