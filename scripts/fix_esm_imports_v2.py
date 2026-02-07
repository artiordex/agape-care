import os
import re

# 패키지의 src 디렉토리 경로
base_dir = r"D:\agape-care\agape-care\packages\api-contract\src"

# import/export 구문에서 상대 경로를 찾는 정규표현식
import_regex = re.compile(r"(from|import)\s+['\"](\.\.?\/[^'\"]+)['\"]")

def resolve_path(file_dir, rel_path):
    # 실제 파일 시스템에서의 절대 경로 계산
    abs_path = os.path.normpath(os.path.join(file_dir, rel_path))

    # 1. 파일인지 확인 (.ts 추가해서)
    if os.path.isfile(abs_path + ".ts"):
        return rel_path + ".js"

    # 2. 디렉토리인지 확인
    if os.path.isdir(abs_path):
        # index.ts가 있는지 확인
        if os.path.isfile(os.path.join(abs_path, "index.ts")):
            return os.path.join(rel_path, "index.js").replace("\\", "/")

    return rel_path

def fix_imports(file_path):
    file_dir = os.path.dirname(file_path)
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_func(match):
        type_word = match.group(1)
        path = match.group(2)

        # 이미 .js로 끝나는 경우 (이전 실행 결과 등) 원본 경로 추출
        clean_path = path
        if path.endswith('.js'):
            clean_path = path[:-3]
            if clean_path.endswith('/index'):
                clean_path = clean_path[:-6]

        new_path = resolve_path(file_dir, clean_path)

        quote = match.group(0)[-1]
        return f"{type_word} {quote}{new_path}{quote}"

    new_content = import_regex.sub(replace_func, content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# 모든 .ts 파일 순회
fixed_count = 0
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.ts'):
            file_path = os.path.join(root, file)
            if fix_imports(file_path):
                print(f"Fixed: {file_path}")
                fixed_count += 1

print(f"Total files fixed: {fixed_count}")
