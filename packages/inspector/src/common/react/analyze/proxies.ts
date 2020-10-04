import ts from 'typescript';
import { ComponentInstanceData } from '../../fibers';
import { createProxyIdentifier } from '../../rpc';

export type AnalyzeRequest = {
  code: string;
  version: number;
  path: string;
};

export type AnalyzeResponse = {
  ast: ts.SourceFile;
  version: number;
};

export interface Analyzer {
  // File update
  $fileChanged(path: string, code: string): Promise<void>;
  $fileDeleted(path: string): Promise<void>;

  $analyze(request: AnalyzeRequest): Promise<void>;
  /**
   * Get the props of the component at that specific location
   */
  $getComponentInstances(path: string): Promise<ComponentInstanceData[]>;
}

export const analyzerProxyIdentifier = createProxyIdentifier<Analyzer>(
  'analyzer'
);