(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("NALUnitParameterSet", function moduleClosure(global, WebModule, VERIFY, VERBOSE) {
"use strict";

// --- technical terms / data structure --------------------
// --- dependency modules ----------------------------------
// --- import / local extract functions --------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
function ParameterSet(strictMode) { // @arg Boolean = false
    this._strictMode = strictMode || false;
    this._sps = {}; // { seq_parameter_set_id: SPS, ... }
    this._pps = {}; // { pic_parameter_set_id: PPS, ... }
    this._sps_id_latest = -1;
    this._pps_id_latest = -1;
}

ParameterSet["VERBOSE"] = VERBOSE;
ParameterSet["prototype"] = Object.create(ParameterSet, {
    "constructor":  { "value": ParameterSet         },
    "getSPS":       { "value": ParameterSet_getSPS  },
    "setSPS":       { "value": ParameterSet_setSPS  },
    "getPPS":       { "value": ParameterSet_getPPS  },
    "setPPS":       { "value": ParameterSet_setPPS  },
    "getLatestSPS": { "value": ParameterSet_getLatestSPS  },
    "getLatestPPS": { "value": ParameterSet_getLatestPPS  },
});

// --- implements ------------------------------------------
function ParameterSet_getSPS(id) { // @arg UINT8 - seq_parameter_set_id
                                   // @ret SPS
    if (!(id in this._sps)) {
        console.error("NOT_FOUND SPS ID: " + id);
        if (!this._strictMode) {
            if (this._sps_id_latest >= 0 && this._sps[this._sps_id_latest]) {
                return this._sps[this._sps_id_latest];
            }
            var ids = Object.keys(this._sps);
            if (ids.length) {
                return this._sps[ids[0]];
            }
        }
        throw new TypeError("NOT_FOUND SPS ID: " + id);
    }
    return this._sps[id];
}

function ParameterSet_setSPS(id,    // @arg UINT8 - seq_parameter_set_id
                             sps) { // @arg SPS
    if (id in this._sps) {
        if (ParameterSet["VERBOSE"]) {
            console.log("NALUnitParameterSet OVERWRITE SPS ID: " + id);
        }
    }
    this._sps[id] = sps;
    this._sps_id_latest = id;
}

function ParameterSet_getPPS(id) { // @arg UINT8 - pic_parameter_set_id
                                   // @ret PPS
    if (!(id in this._pps)) {
        if (!this._strictMode) {
            if (this._pps_id_latest >= 0 && this._pps[this._pps_id_latest]) {
                return this._pps[this._pps_id_latest];
            }
            var ids = Object.keys(this._pps);
            if (ids.length) {
                return this._pps[ids[0]];
            }
        }
        throw new TypeError("NOT_FOUND PPS ID: " + id);
    }
    return this._pps[id];
}

function ParameterSet_setPPS(id,    // @arg UINT8 - pic_parameter_set_id
                             pps) { // @arg PPS
    if (id in this._pps) {
        if (ParameterSet["VERBOSE"]) {
            console.log("NALUnitParameterSet OVERWRITE PPS ID: " + id);
        }
    }
    this._pps[id] = pps;
    this._pps_id_latest = id;
}

function ParameterSet_getLatestSPS() { // @ret SPS|null
    if (this._sps_id_latest >= 0) {
        return this._sps[this._sps_id_latest];
    }
    return null;
}

function ParameterSet_getLatestPPS() { // @ret PPS|null
    if (this._pps_id_latest >= 0) {
        return this._pps[this._pps_id_latest];
    }
    return null;
}

return ParameterSet; // return entity

});

