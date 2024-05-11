# https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c

init:
	npm init

tsc:
	yarn add -D typescript ts-node
	npx tsc --init
	# update "outDir": "./dist",

tsup:
	yarn add tsup --dev
	echo "" > tsup.config.ts

tsjest:
	yarn add -D jest ts-jest @types/jest

build:
	yarn run build

publish:
	npm adduser
	npm publish