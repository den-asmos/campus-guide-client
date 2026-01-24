import {
	courseLabel,
	facultyLabel,
	genderLabel,
	Group,
	roleLabel,
} from "@/services/user/types";

export const roleOptions = Object.entries(roleLabel).map(([value, label]) => ({
	value,
	label,
}));

export const genderOptions = Object.entries(genderLabel).map(
	([value, label]) => ({
		value,
		label,
	})
);

export const facultyOptions = Object.entries(facultyLabel).map(
	([value, label]) => ({
		value,
		label,
	})
);

export const courseOptions = Object.entries(courseLabel).map(
	([value, label]) => ({
		value: Number(value),
		label,
	})
);

export const groupOptions = Object.values(Group).map((group) => ({
	value: group,
	label: group,
}));

export type LocationType = "classroom" | "connector" | "stairs" | "elevator";

export type FloorLocation = {
	title: string;
	type: LocationType;
	coordinates: number[][];
	pin: {
		x: number;
		y: number;
	};
};

export const floors: Record<string, FloorLocation[]> = {
	third: [
		{
			title: "301",
			type: "classroom",
			coordinates: [
				[55, 10],
				[140, 10],
				[140, 120],
				[55, 120],
			],
			pin: { x: 120, y: 50 },
		},
		{
			title: "301-302",
			type: "connector",
			coordinates: [
				[150, 10],
				[190, 10],
				[190, 120],
				[150, 120],
			],
			pin: { x: 160, y: 50 },
		},
		{
			title: "302",
			type: "classroom",
			coordinates: [
				[200, 10],
				[285, 10],
				[285, 120],
				[200, 120],
			],
			pin: { x: 200, y: 50 },
		},
		{
			title: "301А",
			type: "classroom",
			coordinates: [
				[55, 130],
				[140, 130],
				[140, 170],
				[55, 170],
			],
			pin: { x: 120, y: 135 },
		},
		{
			title: "301А-304",
			type: "connector",
			coordinates: [
				[150, 130],
				[190, 130],
				[190, 170],
				[150, 170],
			],
			pin: { x: 160, y: 135 },
		},
		{
			title: "304",
			type: "classroom",
			coordinates: [
				[200, 130],
				[285, 130],
				[285, 170],
				[200, 170],
			],
			pin: { x: 200, y: 135 },
		},
		{
			title: "303",
			type: "classroom",
			coordinates: [
				[55, 180],
				[140, 180],
				[140, 290],
				[55, 290],
			],
			pin: { x: 120, y: 220 },
		},
		{
			title: "303-stairs31",
			type: "connector",
			coordinates: [
				[150, 180],
				[190, 180],
				[190, 240],
				[150, 240],
			],
			pin: { x: 160, y: 200 },
		},
		{
			title: "stairs31",
			type: "stairs",
			coordinates: [
				[200, 180],
				[285, 180],
				[285, 240],
				[200, 240],
			],
			pin: { x: 200, y: 200 },
		},
		{
			title: "elevator3",
			type: "elevator",
			coordinates: [
				[55, 300],
				[140, 300],
				[140, 335],
				[55, 335],
			],
			pin: { x: 120, y: 305 },
		},
		{
			title: "elevator3-306",
			type: "connector",
			coordinates: [
				[150, 250],
				[190, 250],
				[190, 360],
				[150, 360],
			],
			pin: { x: 160, y: 305 },
		},
		{
			title: "306",
			type: "classroom",
			coordinates: [
				[200, 250],
				[285, 250],
				[285, 360],
				[200, 360],
			],
			pin: { x: 200, y: 290 },
		},
		{
			title: "305",
			type: "classroom",
			coordinates: [
				[55, 345],
				[140, 345],
				[140, 455],
				[55, 455],
			],
			pin: { x: 120, y: 390 },
		},
		{
			title: "305-306А",
			type: "connector",
			coordinates: [
				[150, 370],
				[190, 370],
				[190, 410],
				[150, 410],
			],
			pin: { x: 160, y: 375 },
		},
		{
			title: "306А",
			type: "classroom",
			coordinates: [
				[200, 370],
				[285, 370],
				[285, 410],
				[200, 410],
			],
			pin: { x: 200, y: 375 },
		},
		{
			title: "305-347",
			type: "connector",
			coordinates: [
				[150, 420],
				[190, 420],
				[190, 455],
				[150, 455],
			],
			pin: { x: 160, y: 425 },
		},
		{
			title: "347",
			type: "classroom",
			coordinates: [
				[200, 420],
				[285, 420],
				[285, 455],
				[200, 455],
			],
			pin: { x: 200, y: 425 },
		},
		{
			title: "307",
			type: "classroom",
			coordinates: [
				[55, 465],
				[140, 465],
				[140, 530],
				[55, 530],
			],
			pin: { x: 120, y: 485 },
		},
		{
			title: "307-308",
			type: "connector",
			coordinates: [
				[150, 465],
				[190, 465],
				[190, 530],
				[150, 530],
			],
			pin: { x: 160, y: 485 },
		},
		{
			title: "308",
			type: "classroom",
			coordinates: [
				[200, 465],
				[285, 465],
				[285, 575],
				[200, 575],
			],
			pin: { x: 200, y: 510 },
		},
		{
			title: "309",
			type: "classroom",
			coordinates: [
				[55, 540],
				[140, 540],
				[140, 650],
				[55, 650],
			],
			pin: { x: 120, y: 580 },
		},
		{
			title: "309-308",
			type: "connector",
			coordinates: [
				[150, 540],
				[190, 540],
				[190, 575],
				[150, 575],
			],
			pin: { x: 160, y: 545 },
		},
		{
			title: "309-310",
			type: "connector",
			coordinates: [
				[150, 585],
				[190, 585],
				[190, 650],
				[150, 650],
			],
			pin: { x: 160, y: 605 },
		},
		{
			title: "310",
			type: "classroom",
			coordinates: [
				[200, 585],
				[285, 585],
				[285, 650],
				[200, 650],
			],
			pin: { x: 200, y: 605 },
		},
		{
			title: "309А",
			type: "classroom",
			coordinates: [
				[55, 660],
				[140, 660],
				[140, 720],
				[55, 720],
			],
			pin: { x: 120, y: 675 },
		},
		{
			title: "309А-312",
			type: "connector",
			coordinates: [
				[150, 660],
				[190, 660],
				[190, 695],
				[150, 695],
			],
			pin: { x: 160, y: 665 },
		},
		{
			title: "312",
			type: "classroom",
			coordinates: [
				[200, 660],
				[285, 660],
				[285, 695],
				[200, 695],
			],
			pin: { x: 200, y: 665 },
		},
		{
			title: "311",
			type: "classroom",
			coordinates: [
				[55, 730],
				[140, 730],
				[140, 770],
				[55, 770],
			],
			pin: { x: 120, y: 740 },
		},
		{
			title: "311-314",
			type: "connector",
			coordinates: [
				[150, 705],
				[190, 705],
				[190, 770],
				[150, 770],
			],
			pin: { x: 160, y: 725 },
		},
		{
			title: "314",
			type: "classroom",
			coordinates: [
				[200, 705],
				[285, 705],
				[285, 770],
				[200, 770],
			],
			pin: { x: 200, y: 725 },
		},
		{
			title: "313",
			type: "classroom",
			coordinates: [
				[55, 780],
				[140, 780],
				[140, 890],
				[55, 890],
			],
			pin: { x: 120, y: 825 },
		},
		{
			title: "313-wall",
			type: "connector",
			coordinates: [
				[150, 780],
				[190, 780],
				[190, 890],
				[150, 890],
			],
			pin: { x: 160, y: 825 },
		},
		{
			title: "315",
			type: "classroom",
			coordinates: [
				[55, 900],
				[140, 900],
				[140, 940],
				[55, 940],
			],
			pin: { x: 120, y: 905 },
		},
		{
			title: "315-wall",
			type: "connector",
			coordinates: [
				[150, 900],
				[190, 900],
				[190, 940],
				[150, 940],
			],
			pin: { x: 160, y: 905 },
		},
		{
			title: "317",
			type: "classroom",
			coordinates: [
				[55, 950],
				[140, 950],
				[140, 1010],
				[55, 1010],
			],
			pin: { x: 120, y: 965 },
		},
		{
			title: "317-316",
			type: "connector",
			coordinates: [
				[150, 950],
				[190, 950],
				[190, 1010],
				[150, 1010],
			],
			pin: { x: 160, y: 965 },
		},
		{
			title: "316",
			type: "classroom",
			coordinates: [
				[200, 925],
				[285, 925],
				[285, 1010],
				[200, 1010],
			],
			pin: { x: 200, y: 955 },
		},
		{
			title: "317А",
			type: "classroom",
			coordinates: [
				[55, 1020],
				[140, 1020],
				[140, 1080],
				[55, 1080],
			],
			pin: { x: 120, y: 1035 },
		},
		{
			title: "317А-stairs32",
			type: "connector",
			coordinates: [
				[150, 1020],
				[190, 1020],
				[190, 1080],
				[150, 1080],
			],
			pin: { x: 160, y: 1035 },
		},
		{
			title: "stairs32",
			type: "stairs",
			coordinates: [
				[200, 1020],
				[285, 1020],
				[285, 1080],
				[200, 1080],
			],
			pin: { x: 200, y: 1035 },
		},
		{
			title: "319",
			type: "classroom",
			coordinates: [
				[55, 1090],
				[140, 1090],
				[140, 1200],
				[55, 1200],
			],
			pin: { x: 120, y: 1135 },
		},
		{
			title: "319-346",
			type: "connector",
			coordinates: [
				[150, 1090],
				[190, 1090],
				[190, 1130],
				[150, 1130],
			],
			pin: { x: 160, y: 1100 },
		},
		{
			title: "346",
			type: "classroom",
			coordinates: [
				[200, 1090],
				[285, 1090],
				[285, 1130],
				[200, 1130],
			],
			pin: { x: 200, y: 1100 },
		},
		{
			title: "319-345",
			type: "connector",
			coordinates: [
				[150, 1140],
				[190, 1140],
				[190, 1175],
				[150, 1175],
			],
			pin: { x: 160, y: 1145 },
		},
		{
			title: "345",
			type: "classroom",
			coordinates: [
				[200, 1140],
				[285, 1140],
				[285, 1175],
				[200, 1175],
			],
			pin: { x: 200, y: 1145 },
		},
		{
			title: "319-318",
			type: "connector",
			coordinates: [
				[150, 1185],
				[190, 1185],
				[190, 1225],
				[150, 1225],
			],
			pin: { x: 160, y: 1195 },
		},
		{
			title: "318",
			type: "classroom",
			coordinates: [
				[200, 1185],
				[285, 1185],
				[285, 1225],
				[200, 1225],
			],
			pin: { x: 200, y: 1195 },
		},
		{
			title: "321",
			type: "classroom",
			coordinates: [
				[55, 1210],
				[140, 1210],
				[140, 1325],
				[55, 1325],
			],
			pin: { x: 120, y: 1255 },
		},
		{
			title: "321-wall",
			type: "connector",
			coordinates: [
				[150, 1230],
				[190, 1230],
				[190, 1325],
				[150, 1325],
			],
			pin: { x: 160, y: 1255 },
		},
		{
			title: "323",
			type: "classroom",
			coordinates: [
				[55, 1335],
				[140, 1335],
				[140, 1370],
				[55, 1370],
			],
			pin: { x: 120, y: 1340 },
		},
		{
			title: "323-wall",
			type: "connector",
			coordinates: [
				[150, 1335],
				[190, 1335],
				[190, 1370],
				[150, 1370],
			],
			pin: { x: 160, y: 1340 },
		},
		{
			title: "325",
			type: "classroom",
			coordinates: [
				[55, 1380],
				[140, 1380],
				[140, 1420],
				[55, 1420],
			],
			pin: { x: 120, y: 1385 },
		},
		{
			title: "325-320",
			type: "connector",
			coordinates: [
				[150, 1380],
				[190, 1380],
				[190, 1420],
				[150, 1420],
			],
			pin: { x: 160, y: 1385 },
		},
		{
			title: "320",
			type: "classroom",
			coordinates: [
				[200, 1380],
				[285, 1380],
				[285, 1515],
				[200, 1515],
			],
			pin: { x: 200, y: 1435 },
		},
		{
			title: "327",
			type: "classroom",
			coordinates: [
				[55, 1430],
				[140, 1430],
				[140, 1465],
				[55, 1465],
			],
			pin: { x: 120, y: 1435 },
		},
		{
			title: "327-320",
			type: "connector",
			coordinates: [
				[150, 1430],
				[190, 1430],
				[190, 1465],
				[150, 1465],
			],
			pin: { x: 160, y: 1435 },
		},
		{
			title: "329",
			type: "classroom",
			coordinates: [
				[55, 1475],
				[140, 1475],
				[140, 1515],
				[55, 1515],
			],
			pin: { x: 120, y: 1480 },
		},
		{
			title: "329-320",
			type: "connector",
			coordinates: [
				[150, 1475],
				[190, 1475],
				[190, 1515],
				[150, 1515],
			],
			pin: { x: 160, y: 1480 },
		},
		{
			title: "329А",
			type: "classroom",
			coordinates: [
				[55, 1525],
				[140, 1525],
				[140, 1585],
				[55, 1585],
			],
			pin: { x: 120, y: 1540 },
		},
		{
			title: "329А-322",
			type: "connector",
			coordinates: [
				[150, 1525],
				[190, 1525],
				[190, 1585],
				[150, 1585],
			],
			pin: { x: 160, y: 1540 },
		},
		{
			title: "322",
			type: "classroom",
			coordinates: [
				[200, 1525],
				[285, 1525],
				[285, 1585],
				[200, 1585],
			],
			pin: { x: 200, y: 1540 },
		},
		{
			title: "331",
			type: "classroom",
			coordinates: [
				[55, 1595],
				[140, 1595],
				[140, 1655],
				[55, 1655],
			],
			pin: { x: 120, y: 1610 },
		},
		{
			title: "331-324",
			type: "connector",
			coordinates: [
				[150, 1595],
				[190, 1595],
				[190, 1635],
				[150, 1635],
			],
			pin: { x: 160, y: 1600 },
		},
		{
			title: "324",
			type: "classroom",
			coordinates: [
				[200, 1595],
				[285, 1595],
				[285, 1635],
				[200, 1635],
			],
			pin: { x: 200, y: 1600 },
		},
		{
			title: "333",
			type: "classroom",
			coordinates: [
				[55, 1665],
				[140, 1665],
				[140, 1780],
				[55, 1780],
			],
			pin: { x: 120, y: 1710 },
		},
		{
			title: "333-326",
			type: "connector",
			coordinates: [
				[150, 1645],
				[190, 1645],
				[190, 1755],
				[150, 1755],
			],
			pin: { x: 160, y: 1685 },
		},
		{
			title: "326",
			type: "classroom",
			coordinates: [
				[200, 1645],
				[285, 1645],
				[285, 1755],
				[200, 1755],
			],
			pin: { x: 200, y: 1685 },
		},
		{
			title: "335",
			type: "classroom",
			coordinates: [
				[55, 1785],
				[140, 1785],
				[140, 1825],
				[55, 1825],
			],
			pin: { x: 120, y: 1790 },
		},
		{
			title: "335-328",
			type: "connector",
			coordinates: [
				[150, 1765],
				[190, 1765],
				[190, 1805],
				[150, 1805],
			],
			pin: { x: 160, y: 1770 },
		},
		{
			title: "328",
			type: "classroom",
			coordinates: [
				[200, 1765],
				[285, 1765],
				[285, 1805],
				[200, 1805],
			],
			pin: { x: 200, y: 1770 },
		},
		{
			title: "337",
			type: "classroom",
			coordinates: [
				[55, 1835],
				[140, 1835],
				[140, 1900],
				[55, 1900],
			],
			pin: { x: 120, y: 1855 },
		},
		{
			title: "337-344",
			type: "connector",
			coordinates: [
				[150, 1810],
				[190, 1810],
				[190, 1850],
				[150, 1850],
			],
			pin: { x: 160, y: 1820 },
		},
		{
			title: "344",
			type: "classroom",
			coordinates: [
				[200, 1810],
				[285, 1810],
				[285, 1850],
				[200, 1850],
			],
			pin: { x: 200, y: 1820 },
		},
		{
			title: "337-342",
			type: "connector",
			coordinates: [
				[150, 1860],
				[190, 1860],
				[190, 1900],
				[150, 1900],
			],
			pin: { x: 160, y: 1865 },
		},
		{
			title: "342",
			type: "classroom",
			coordinates: [
				[200, 1860],
				[285, 1860],
				[285, 1900],
				[200, 1900],
			],
			pin: { x: 200, y: 1865 },
		},
		{
			title: "339",
			type: "classroom",
			coordinates: [
				[55, 1905],
				[140, 1905],
				[140, 1945],
				[55, 1945],
			],
			pin: { x: 120, y: 1915 },
		},
		{
			title: "339-stairs33",
			type: "connector",
			coordinates: [
				[150, 1905],
				[190, 1905],
				[190, 1945],
				[150, 1945],
			],
			pin: { x: 160, y: 1915 },
		},
		{
			title: "stairs33",
			type: "stairs",
			coordinates: [
				[200, 1905],
				[285, 1905],
				[285, 1970],
				[200, 1970],
			],
			pin: { x: 200, y: 1925 },
		},
		{
			title: "341",
			type: "classroom",
			coordinates: [
				[55, 1955],
				[140, 1955],
				[140, 2065],
				[55, 2065],
			],
			pin: { x: 120, y: 1995 },
		},
		{
			title: "341-330",
			type: "connector",
			coordinates: [
				[150, 1955],
				[190, 1955],
				[190, 2065],
				[150, 2065],
			],
			pin: { x: 160, y: 2010 },
		},
		{
			title: "330",
			type: "classroom",
			coordinates: [
				[200, 1980],
				[285, 1980],
				[285, 2065],
				[200, 2065],
			],
			pin: { x: 200, y: 2010 },
		},
	],
};
