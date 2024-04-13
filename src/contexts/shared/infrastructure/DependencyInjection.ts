interface Dep {
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  fn: Function;
  args?: string[];
  tags?: string[];
}

const DependencyInjectionContainer = () => {
  const dependencies = new Map<string, unknown>();
  const tagged = new Map<string, unknown[]>();

  const depGet = <T>(id: string) => {
    const dep = dependencies.get(id) as T;
    if (!dep) throw new Error(`Dependency ${id} not found`);
    return dep;
  };

  const depSet = (id: string, value: unknown): void => {
    dependencies.set(id, value);
  };

  const tagSet = (id: string, value: unknown): void => {
    tagged.set(id, [...(tagged.get(id) ?? []), value]);
  };

  const compileArg = (arg: string) => {
    if (!arg.startsWith("@")) return arg;

    return depGet(arg.slice(1));
  };

  const compile = (deps: Record<string, Dep>) => {
    for (const [id, dep] of Object.entries(deps)) {
      const args = dep.args?.map(compileArg) ?? [];
      const tags = dep.tags ?? [];

      const inst = dep.fn(...args);

      depSet(id, inst);

      for (const tag of tags) tagSet(tag, inst);
    }
  };

  const fromTag = (tag: string) => {
    const taggedDeps = tagged.get(tag) as unknown[];
    if (!taggedDeps) throw new Error(`Tag ${tag} not found`);

    return taggedDeps;
  };

  return {
    get: depGet,
    set: depSet,
    compile,
    fromTag,
  };
};

const container = DependencyInjectionContainer();

export const DependencyInjection = () => container;
export type DependencyInjection = ReturnType<typeof DependencyInjection>;
