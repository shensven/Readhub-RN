import {atom} from 'jotai';
import {mmkvAppearance} from '../../App';

export type StatusBarStyle = 'light-content' | 'dark-content';
export const atomStatusBarStyle = atom<StatusBarStyle>('dark-content');

// -----------------------------------------------------------------------------

export type Appearance = 'light' | 'dark' | 'followSystem';

let initAppearance: Appearance | undefined;
if (mmkvAppearance) {
  initAppearance = JSON.parse(mmkvAppearance);
} else {
  initAppearance = 'followSystem';
}
export const atomAppearance = atom<Appearance>(initAppearance!);
