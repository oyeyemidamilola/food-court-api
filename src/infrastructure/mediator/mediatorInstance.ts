import Container from 'typedi';
import { Mediator, IMediator } from 'mediatr-ts';

export function MediatorInstance(): any {
	return (object: any, propertyName: string, index?: number): any => {
		const mediator = new Mediator();
		Container.registerHandler({
			object,
			propertyName,
			index,
			value: () => mediator,
		});
	};
}

export function GetMediatorInstance(): IMediator {
	const mediator = new Mediator();
	return mediator;
}
