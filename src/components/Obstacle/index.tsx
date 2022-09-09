import './style.scss';
import { orientationToClass } from '../../core/orientation';
import { Obstacle } from '../../core/Classes/Obstacle';

export default function RxObstacle({ orientation, className }: Obstacle) {
	return <div className={['obstacle', className, orientationToClass(orientation)].join(' ')}></div>;
}
