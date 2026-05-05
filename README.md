# MirrorCommits

Uma ferramenta que espelha automaticamente seus commits Git em um repositório público, registrando os metadados sem expor o código-fonte.

## Como funciona

A cada commit em qualquer repositório, um hook do Git dispara o script `mirror.js`, que registra os metadados do commit — autor, data e nome do repositório — em um arquivo `commits.json` no repositório público e faz o push automaticamente.

```
git commit
    └── hook post-commit
            └── mirror.js
                    └── adiciona no commits.json
                            └── git push (repositório público)
```

## O que é registrado

Nenhum código-fonte é copiado. Apenas metadados são armazenados:

```json
[
  {
    "author": "Luiz",
    "repository": "meu-projeto",
    "date": "2026-05-04T10:30:00-03:00"
  }
]
```

## Configuração

### 1. Clone este repositório

```bash
git clone https://github.com/seu-usuario/MirrorCommits.git ~/MirrorCommits
```

### 2. Coloque os arquivos do hook

Coloque `mirror.js` e `post-commit` em uma pasta acessível globalmente, por exemplo `~/.git-hooks/`:

```bash
cp mirror.js ~/.git-hooks/
cp post-commit ~/.git-hooks/
chmod +x ~/.git-hooks/post-commit
```

### 3. Configure o Git para usar os hooks globalmente

```bash
git config --global core.hooksPath ~/.git-hooks
```

Isso faz com que todo repositório na sua máquina dispare o hook a cada commit.

## Arquivos

| Arquivo                  | Descrição                                                                     |
| ------------------------ | ----------------------------------------------------------------------------- |
| `mirror.js`              | Script principal — lê os metadados do commit e faz push para este repositório |
| `.git-hooks/post-commit` | Hook shell que chama o `mirror.js` após cada commit                           |
| `commits.json`           | Log gerado automaticamente com todos os commits espelhados                    |

## Requisitos

- Node.js
- Git
- Acesso SSH configurado para push no repositório público
