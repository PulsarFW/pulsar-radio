local policeRestriction = { type = "job", job = "police", workplace = false, level = 0, jobPermission = false, reqDuty = true }
local correctionsRestriction = { type = "job", job = "prison", workplace = false, level = 0, jobPermission = false, reqDuty = true }
local emsRestriction = { type = "job", job = "ems", workplace = false, level = 0, jobPermission = false, reqDuty = true }

return {
	EmergencyRestriction = {
		policeRestriction,
		emsRestriction,
		correctionsRestriction,
	},
	-- unused for now, kept for the planned blackline emergency channel
	TunaRestriction = { type = "job", job = "blackline", workplace = false, level = 0, jobPermission = false, reqDuty = true },
	RadioData = {
		{ -- Encrypted Radio
			min = 1,
			max = 9999,
			job = { "police", "ems", "prison", "dgang", "blackline" },
		},
		{ -- Extendy Radio
			min = 100,
			max = 2000,
		},
		{ -- Civ Radio
			min = 100,
			max = 1000,
		},
	},
}
