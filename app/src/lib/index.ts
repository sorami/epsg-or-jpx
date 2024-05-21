type Mode = 'question' | 'answer';

type Group = 'both' | 'epsg' | 'jpx';
const groups: Group[] = ['both', 'epsg', 'jpx'] as const;

type CodeItem = {
	code: string;
	epsg: string | null;
	jpx: string | null;
};

export { groups };
export type { Mode, Group, CodeItem };
