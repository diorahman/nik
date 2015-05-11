test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
					--require should \
					--timeout 10000 \
					test.js
.PHONY: tes
