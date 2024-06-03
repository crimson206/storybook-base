import express, { Request, Response, Router } from 'express';
import ts from 'typescript'
// import fs from 'fs'; // 필요하다면 주석 해제
import path from 'path';
import getTypeString from './typecheck'
import Du

// SomeFunction 타입 정의
interface SomeFunctionArgs {
  arg: string;
}

const SomeFunction = ({ arg }: SomeFunctionArgs): { some: string } => {
  return { some: `Json with ${arg}` };
}

// 함수 모듈로 내보내기
export default function setupRouter(router: Router): void {
  router.use(express.json());
  
  router.post('/some_function', (req: Request, res: Response) => {
    const { arg } = req.body;
    const json = SomeFunction({ arg });
    res.json(json);
  });
}
