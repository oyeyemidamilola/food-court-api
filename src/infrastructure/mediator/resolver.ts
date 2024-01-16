import Container from 'typedi';
import { IResolver } from 'mediatr-ts';

export class IocResolver implements IResolver {
	resolve<T>(name: string): T {
		return Container.get(name);
	}
	add(name: string, instance: Function): void {
		Container.registerHandler({
			object: name as any,
			value: () => instance,
		});
	}
	remove(name: string): void {
		Container.remove(name);
	}
	clear(): void {
		Container.reset();
	}
}