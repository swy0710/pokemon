export interface EvolutionNode {
  speciesName: string;
  speciesId: number;
  evolvesTo: EvolutionNode[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}
