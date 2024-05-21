type GROUP = 'both' | 'epsg' | 'jpx';
const groups: GROUP[] = ['both', 'epsg', 'jpx'] as const;

type CodeItem = {
	code: string;
	epsg: string | null;
	jpx: string | null;
};

export { groups };
export type { GROUP, CodeItem };
