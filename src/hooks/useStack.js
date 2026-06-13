import { useLocalStorage } from './useLocalStorage';

export function useStack() {
  const [stacks, setStacks] = useLocalStorage('nexora-stacks', []);

  const createStack = (name, description, emoji) => {
    const newStack = {
      id: `stack-${Date.now()}`,
      name,
      description,
      emoji: emoji || '🚀',
      toolIds: [],
      createdAt: new Date().toISOString()
    };
    setStacks((prev) => [...prev, newStack]);
    return newStack;
  };

  const addToolToStack = (stackId, toolId) => {
    setStacks((prev) =>
    prev.map((stack) =>
    stack.id === stackId && !stack.toolIds.includes(toolId) ?
    { ...stack, toolIds: [...stack.toolIds, toolId] } :
    stack
    )
    );
  };

  const removeToolFromStack = (stackId, toolId) => {
    setStacks((prev) =>
    prev.map((stack) =>
    stack.id === stackId ?
    { ...stack, toolIds: stack.toolIds.filter((id) => id !== toolId) } :
    stack
    )
    );
  };

  const deleteStack = (stackId) => {
    setStacks((prev) => prev.filter((stack) => stack.id !== stackId));
  };

  const updateStack = (stackId, updates) => {
    setStacks((prev) =>
    prev.map((stack) =>
    stack.id === stackId ? { ...stack, ...updates } : stack
    )
    );
  };

  const shareStack = (stackId) => {
    return `https://nexoraai.vercel.app/stack/${stackId}`;
  };

  return {
    stacks,
    createStack,
    addToolToStack,
    removeToolFromStack,
    deleteStack,
    updateStack,
    shareStack
  };
}