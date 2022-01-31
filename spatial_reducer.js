// AUTOMATICALLY GENERATED: imported vars from saved link.

// Code Link
// https://code.earthengine.google.co.in/13fa8e0a26585f25cb9e8ab2a61804c3

var CONVERT_TO_IMPORT = (
[{"type":"imageCollection","name":"PrecipCollection","record":{"id":"UCSB-CHG/CHIRPS/PENTAD"}},{"type":"table","name":"WorldBnd","record":{"id":"USDOS/LSIB/2013"}},{"type":"table","name":"US_States","record":{"id":"TIGER/2018/States"}}])

// AUTOMATICALLY GENERATED: location from saved link.
Map.setCenter(82.75252934999997, 21.715551619331528, 2)

// temporal reducer and spatial reducer

//temporal reducer
// Filter with respect to an entire year
var precip_2018 = PrecipCollection.filterDate('2018-01-01','2018-12-31');

// Extracting US boundary

var US = WorldBnd.filter(ee.Filter.eq('cc','US'));
Map.addLayer(US);
var precip_US = precip_2018.map(function(img){return img.clip(US)});

print(precip_US);
// reduce: Temporal reduce

var annualPrecip = precip_US.reduce(ee.Reducer.sum());
print(annualPrecip);

var pal_precip = ['white', 'blue'];

Map.addLayer(annualPrecip, {min:60, max:3000, palette:pal_precip}, 'Precipitation 2018');

// Spatial Reducer

var State_Precip = annualPrecip.reduceRegions({
  collection:US_States,
  reducer:ee.Reducer.mean(),
  scale:5000
});

print(State_Precip);
