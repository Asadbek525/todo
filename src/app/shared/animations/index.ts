import { animate, state, style, transition, trigger } from '@angular/animations'

export const expandCollapseAnimation = trigger('expandCollapse', [
  state('collapsed, void', style({ height: '0px' })),
  state('expanded', style({ height: '*', width: '100%' })),
  transition(
    'expanded <=> collapsed, void => expanded',
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
  ),
])

export const rotateAnimation = trigger('rotate', [
  state('default', style({ transform: 'rotate(0)' })),
  state('rotated', style({ transform: 'rotate(90deg)' })),
  transition('rotated => default', animate('225ms ease-out')),
  transition('default => rotated', animate('225ms ease-in')),
])
