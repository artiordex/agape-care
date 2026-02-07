import os
import re

# 패키지의 src 디렉토리 경로
base_dir = r"D:\agape-care\agape-care\packages\api-contract\src"

# import/export 구문에서 상대 경로를 찾는 정규표현식
# - import ... from './...'
# - export * from './...'
# - import('./...')
import_regex = re.compile(r"(from|import)\s+['\"](\.\.?\/[^'\"]+)['\"]")

def fix_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content

    # 모든 매치 찾기
    matches = import_regex.findall(content)
    for type_word, path in matches:
        # 이미 .js로 끝나거나 확장이 있는 경우 제외 (간단하게 '.'이 포함된 경우)
        # 하지만 폴더/index 형태인 경우 '.'이 없을 수 있음.
        # ESM에서는 파일인 경우 .js를 붙여야 하고, 폴더인 경우 폴더/index.js를 붙여야 함.
        # 여기서는 단순하게 상대 경로인데 .js가 없으면 붙이는 방향으로 진행 (이미 .js가 있으면 유지)
        if not path.endswith('.js'):
            old_str = f"{type_word} '{path}'"
            new_str = f"{type_word} '{path}.js'"

            # 쌍따옴표인 경우도 고려해야 하므로 더 정확하게 치환
            # 하지만 content.replace는 단순 문자열 매칭이므로 regex sub를 쓰는게 나음
            pass

    # 정규표현식을 사용한 치환
    def replace_func(match):
        type_word = match.group(1)
        path = match.group(2)
        if not path.endswith('.js'):
            # 따옴표 유지 (원래 따옴표가 홑따옴표인지 쌍따옴표인지 확인)
            quote = match.group(0)[-1]
            return f"{type_word} {quote}{path}.js{quote}"
        return match.group(0)

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
