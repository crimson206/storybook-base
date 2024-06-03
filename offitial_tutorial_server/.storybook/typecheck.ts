import * as ts from 'typescript';
import * as path from 'path';

function getTypeString(type: ts.Type, checker: ts.TypeChecker): string {
  return checker.typeToString(type);
}

function extractTypeInfo(filePath: string) {
  const program = ts.createProgram([filePath], {});
  const checker = program.getTypeChecker();

  const sourceFile = program.getSourceFile(filePath);
  if (!sourceFile) {
    throw new Error(`Could not find source file: ${filePath}`);
  }

  const typeInfo: any = {};

  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      typeInfo[interfaceName] = {};

      node.members.forEach(member => {
        if (ts.isMethodSignature(member)) {
          const methodName = member.name.getText();
          const signature = checker.getSignatureFromDeclaration(member);
          const returnType = signature ? getTypeString(signature.getReturnType(), checker) : 'void';

          const parameters = member.parameters.map(param => {
            const paramName = param.name.getText();
            const paramType = param.type ? getTypeString(checker.getTypeAtLocation(param.type), checker) : 'any';
            return { name: paramName, type: paramType };
          });

          typeInfo[interfaceName][methodName] = {
            parameters,
            returnType
          };
        }
      });
    }
  });

  return typeInfo;
}

const filePath = path.resolve(__dirname, '/home/crimson/Projects/storybook-base/offitial_tutorial_server/node_modules/@types/babel__generator/index.d.ts');
const typeInfo = extractTypeInfo(filePath);
console.log(JSON.stringify(typeInfo, null, 2));

export default getTypeString