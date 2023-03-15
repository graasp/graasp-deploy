# Changelog

## [1.14.0](https://github.com/graasp/graasp-deploy/compare/v1.13.1...v1.14.0) (2023-03-15)


### Features

* add composite workflow for s3 deploy ([#134](https://github.com/graasp/graasp-deploy/issues/134)) ([aded997](https://github.com/graasp/graasp-deploy/commit/aded9977de3fe7641a4a3186c639f141bf8502ee))

## [1.13.1](https://github.com/graasp/graasp-deploy/compare/v1.13.0...v1.13.1) (2023-02-07)


### Bug Fixes

* remove comment from illegal context ([67a4c99](https://github.com/graasp/graasp-deploy/commit/67a4c993d1fd817ebffd9d6a2037de163f9a788b))

## [1.13.0](https://github.com/graasp/graasp-deploy/compare/v1.12.2...v1.13.0) (2023-02-06)


### Features

* add DEPLOY_ENV var ([#163](https://github.com/graasp/graasp-deploy/issues/163)) ([9c66ac9](https://github.com/graasp/graasp-deploy/commit/9c66ac9d600b55d0c3bdba90e27c77e905e90837))

## [1.12.2](https://github.com/graasp/graasp-deploy/compare/v1.12.1...v1.12.2) (2023-01-31)


### Bug Fixes

* remove legacy ga env vars ([#159](https://github.com/graasp/graasp-deploy/issues/159)) ([74592ce](https://github.com/graasp/graasp-deploy/commit/74592cec3d9c2d0923f22b00d72388f66c63d069)), closes [#158](https://github.com/graasp/graasp-deploy/issues/158) [#157](https://github.com/graasp/graasp-deploy/issues/157)

## [1.12.1](https://github.com/graasp/graasp-deploy/compare/v1.12.0...v1.12.1) (2023-01-31)


### Bug Fixes

* add missing sentry DSN in container vars ([#160](https://github.com/graasp/graasp-deploy/issues/160)) ([c9f3c74](https://github.com/graasp/graasp-deploy/commit/c9f3c74e7989b4ab500018c85d32cabf9cdd9e53))

## [1.12.0](https://github.com/graasp/graasp-deploy/compare/v1.11.0...v1.12.0) (2023-01-27)


### Features

* add sentry DSN secret ([#155](https://github.com/graasp/graasp-deploy/issues/155)) ([70f6f31](https://github.com/graasp/graasp-deploy/commit/70f6f31105ed89b98f9e1da0cde1dee05ebb004a))


### Bug Fixes

* checkout on main in last step of prod ([5c62d80](https://github.com/graasp/graasp-deploy/commit/5c62d807710a0d74e074b8264096de69985d2b40))

## [1.11.0](https://github.com/graasp/graasp-deploy/compare/v1.10.0...v1.11.0) (2023-01-23)


### Features

* add analytics host to library workflows ([#119](https://github.com/graasp/graasp-deploy/issues/119)) ([0f8d784](https://github.com/graasp/graasp-deploy/commit/0f8d784ad107d7d8ea7193a6b409e2b02b912410))

## [1.10.0](https://github.com/graasp/graasp-deploy/compare/v1.9.0...v1.10.0) (2023-01-11)


### Features

* replace etherpad URL secret by input ([#148](https://github.com/graasp/graasp-deploy/issues/148)) ([acc187b](https://github.com/graasp/graasp-deploy/commit/acc187bdeb0e9097dffa7771d984c55d7a7bd75d))

## [1.9.0](https://github.com/graasp/graasp-deploy/compare/v1.8.0...v1.9.0) (2023-01-10)


### Features

* add etherpad cookie domain input ([#147](https://github.com/graasp/graasp-deploy/issues/147)) ([b5c250b](https://github.com/graasp/graasp-deploy/commit/b5c250b9a9c4ff9275b7deae2a50d467ff3137e0))

## [1.8.0](https://github.com/graasp/graasp-deploy/compare/v1.7.1...v1.8.0) (2023-01-10)


### Features

* add etherpad env vars ([#143](https://github.com/graasp/graasp-deploy/issues/143)) ([f7d4881](https://github.com/graasp/graasp-deploy/commit/f7d4881abe6c6e9da7ec62fb2dc1a80947d6f488))

## [1.7.1](https://github.com/graasp/graasp-deploy/compare/v1.7.0...v1.7.1) (2023-01-09)


### Bug Fixes

* step summary with tag ([c88b39c](https://github.com/graasp/graasp-deploy/commit/c88b39c5e9be6265eaa42b93a44d1227b5f48bf5))

## [1.7.0](https://github.com/graasp/graasp-deploy/compare/v1.6.1...v1.7.0) (2022-12-27)


### Features

* add PG_READ_REPLICAS_CONNECTION_URIS secret ([9a1b4b2](https://github.com/graasp/graasp-deploy/commit/9a1b4b2ba3603b2f8835720ee2d421c624e67e0c))

## [1.6.1](https://github.com/graasp/graasp-deploy/compare/v1.6.0...v1.6.1) (2022-12-07)


### Bug Fixes

* add inputs for npm token ([3b8473f](https://github.com/graasp/graasp-deploy/commit/3b8473fefe4c4016fb4e4bb829ee738f00509b73))

## [1.6.0](https://github.com/graasp/graasp-deploy/compare/v1.5.0...v1.6.0) (2022-12-05)


### Features

* visualize deployments ([#126](https://github.com/graasp/graasp-deploy/issues/126)) ([9e143d4](https://github.com/graasp/graasp-deploy/commit/9e143d4c716702a9ff15222ed6f1b234a0243d6e))


### Bug Fixes

* add shell to script run ([#130](https://github.com/graasp/graasp-deploy/issues/130)) ([4ee68cf](https://github.com/graasp/graasp-deploy/commit/4ee68cf9434703a1985c463a8f90045180fec58e))

## [1.5.0](https://github.com/graasp/graasp-deploy/compare/v1.4.2...v1.5.0) (2022-11-24)


### Features

* a dd noverify in push tag workflow ([195b109](https://github.com/graasp/graasp-deploy/commit/195b109d6e5bdc062cba9c35f2d2b9726157b187))
* add composite action ([944c2a7](https://github.com/graasp/graasp-deploy/commit/944c2a7b45b279de8781ff8cfceea47c44bb37e6))

## [1.4.2](https://github.com/graasp/graasp-deploy/compare/v1.4.1...v1.4.2) (2022-11-17)


### Bug Fixes

* fix google maps key ([#115](https://github.com/graasp/graasp-deploy/issues/115)) ([43e7264](https://github.com/graasp/graasp-deploy/commit/43e7264528e0bedc5e2360618029dabd3dd4fa00))

## [1.4.1](https://github.com/graasp/graasp-deploy/compare/v1.4.0...v1.4.1) (2022-11-17)


### Bug Fixes

* checkout latest commits of main branch after suspend in staging ([b817055](https://github.com/graasp/graasp-deploy/commit/b8170557a90d97e6911f478891000e321c7f0546))

## [1.4.0](https://github.com/graasp/graasp-deploy/compare/v1.3.0...v1.4.0) (2022-11-16)


### Features

* add REACT_APP_VERSION to s3 apps workflows ([2500854](https://github.com/graasp/graasp-deploy/commit/2500854f814e4cd6e3854296ec39956875fc7642))
* add REACT_APP_VERSION to s3 workflows ([4cc7ac1](https://github.com/graasp/graasp-deploy/commit/4cc7ac1d5c9fc05e94662c1773b388f9daaa8682))

## [1.3.0](https://github.com/graasp/graasp-deploy/compare/v1.2.2...v1.3.0) (2022-11-11)


### Features

* add graasp assets url to s3 workflows ([#103](https://github.com/graasp/graasp-deploy/issues/103)) ([caccd85](https://github.com/graasp/graasp-deploy/commit/caccd85c225e9a9b189137d272ed9672a20b645e))

## [1.2.2](https://github.com/graasp/graasp-deploy/compare/v1.2.1...v1.2.2) (2022-11-11)


### Bug Fixes

* summary step update staging stack ([9a5635c](https://github.com/graasp/graasp-deploy/commit/9a5635c2d7847890b56d4c0a4a22835396da0964))

## [1.2.1](https://github.com/graasp/graasp-deploy/compare/v1.2.0...v1.2.1) (2022-11-03)


### Bug Fixes

* add checkout in install step in cypress.yml ([aac0df4](https://github.com/graasp/graasp-deploy/commit/aac0df4e0a3b9c93ae7c067ab2142d72cb6a8321))

## [1.2.0](https://github.com/graasp/graasp-deploy/compare/v1.1.2...v1.2.0) (2022-11-03)


### Features

* create compose action for cache ([#73](https://github.com/graasp/graasp-deploy/issues/73)) ([2574938](https://github.com/graasp/graasp-deploy/commit/2574938a281b45161a9394efa842e078b5de6202))


### Bug Fixes

* remove restore keys for node modules ([42878c0](https://github.com/graasp/graasp-deploy/commit/42878c0d2b346daf99c483e25283558a43251bf1))

## [1.1.2](https://github.com/graasp/graasp-deploy/compare/v1.1.1...v1.1.2) (2022-10-31)


### Bug Fixes

* fix library ([2480c77](https://github.com/graasp/graasp-deploy/commit/2480c77ad4c8f9d14a5c943478af1840f9527b7b))

## [1.1.1](https://github.com/graasp/graasp-deploy/compare/v1.1.0...v1.1.1) (2022-10-27)


### Bug Fixes

* bring back jq with single line output (-c) and remove braces escape ([908d539](https://github.com/graasp/graasp-deploy/commit/908d5392226e71c29aeaaf8ab7674cda4a7cb17e))
* **ci:** remove indentation from diff.json and following minification ([e675a0f](https://github.com/graasp/graasp-deploy/commit/e675a0ff444d9d380d6323328620b71ee0237963))
* remaining substitutions and schenanigans ([36e980e](https://github.com/graasp/graasp-deploy/commit/36e980e56d55b7ff44b9f8f039163920097ba7cd))


### Documentation

* add documentation about PAT ([#87](https://github.com/graasp/graasp-deploy/issues/87)) ([199376e](https://github.com/graasp/graasp-deploy/commit/199376e1e03a27010652417459fe22cf88d7a4b5))

## [1.1.0](https://github.com/graasp/graasp-deploy/compare/v1.0.0...v1.1.0) (2022-10-26)


### Features

* add minor and major tag that follow latest release ([#75](https://github.com/graasp/graasp-deploy/issues/75)) ([067fe29](https://github.com/graasp/graasp-deploy/commit/067fe295c20de64a97dc30344dddf19974796397))

## 1.0.0 (2022-10-26)


### Features

* add  CD reusable workflow for backend ([2a1c2c8](https://github.com/graasp/graasp-deploy/commit/2a1c2c8d287dd7b387e3225609b16b76e1db02ee))
* add badge with link to workflow ([a0ebaa5](https://github.com/graasp/graasp-deploy/commit/a0ebaa58bd619265c6ca9e868d4ba7c529c0e146))
* add builder host env variable ([1f9e255](https://github.com/graasp/graasp-deploy/commit/1f9e25505eed82d174249c1f1744b377648b4c23))
* add caller workflow for ecs template ([84c273c](https://github.com/graasp/graasp-deploy/commit/84c273cfe9cde07f3545b88374a99102924beaa2))
* add caller workflows for s3 templates ([79939bf](https://github.com/graasp/graasp-deploy/commit/79939bfeb85c62abca963a4d5f5f6829157f56a8))
* add cdeployment-trigger workflow ([e8eede4](https://github.com/graasp/graasp-deploy/commit/e8eede4bc65ded10084c69a5c58913d98202a8e3))
* add client host env variables ([d0d188a](https://github.com/graasp/graasp-deploy/commit/d0d188a9fc8de3052d1b2e0cec60e2893a890d85))
* add concurrency control ([9a9ed67](https://github.com/graasp/graasp-deploy/commit/9a9ed67e758641cc2339f4a9568aa7e61bafe232))
* add cypress caller template ([dd55677](https://github.com/graasp/graasp-deploy/commit/dd55677832a1f1cba2ce37529508e5a02033b19e))
* add cypress e2e testing to workflow ([c1991e8](https://github.com/graasp/graasp-deploy/commit/c1991e816e68900c44baac7e9d61f676b7b17610))
* add cypress reusable workflow ([b6ba1ef](https://github.com/graasp/graasp-deploy/commit/b6ba1ef9b6825daf269f758da54c1b4bc98c0fd9))
* add h5p integration url ([1a7c4c7](https://github.com/graasp/graasp-deploy/commit/1a7c4c74273be6fd1c56eb6c5a8fb4af2d211b86))
* add job summary ([9f94ec6](https://github.com/graasp/graasp-deploy/commit/9f94ec64bbacc5ef937346090bf9d0006228dfa7))
* add new env variables for the backend ([9e66031](https://github.com/graasp/graasp-deploy/commit/9e6603179ec6fe4943422367bae92f038b709885))
* add release-please workflow ([c3e1df6](https://github.com/graasp/graasp-deploy/commit/c3e1df615cb17c7ee5824187d0956edfc6e44d12))
* add reusable workflow for ecs deployments ([f9c956b](https://github.com/graasp/graasp-deploy/commit/f9c956bab537eb3a58114dfc2657b9ec864aabc1))
* add reusable workflow for graasp backend ([443b60b](https://github.com/graasp/graasp-deploy/commit/443b60b4ac8308a3819342c371b64ef5ab4081a0))
* add reusable workflow for s3 apps deployments ([33c1d60](https://github.com/graasp/graasp-deploy/commit/33c1d6065fba3b8761b7425d386ca3c4d7af8ceb))
* add reusable workflow for s3 deployments ([15e7238](https://github.com/graasp/graasp-deploy/commit/15e72389240faf8f610a6e25bfa867dac2048d45))
* add reusable workflow to automate tag creation ([5ae237c](https://github.com/graasp/graasp-deploy/commit/5ae237c769c7ed912e2f89613047aac239a9245e))
* add reusable workflows for cd s3 and ecs ([f5ced40](https://github.com/graasp/graasp-deploy/commit/f5ced40341b37173c4d8d231effa5c5d7b59615d))
* add s3 files host env variable ([797c3f2](https://github.com/graasp/graasp-deploy/commit/797c3f2236552d8fd8a7761b43d0daa870636d97))
* add s3 files host env variable ([b7c476a](https://github.com/graasp/graasp-deploy/commit/b7c476af9f2e490a64ce7a9184102387ae1f588a))
* add Sentry and H5P env variables ([bfed157](https://github.com/graasp/graasp-deploy/commit/bfed15701fd192754daf01c74e7a5b66ab9f1da4))
* add Sentry and H5P env variables ([57d0fec](https://github.com/graasp/graasp-deploy/commit/57d0fecfa7a1eb483795f6ac98eba01ed7208009))
* add sentry env variable for apps ([1abe368](https://github.com/graasp/graasp-deploy/commit/1abe368ed19d5767310b357afb87e794adc1af49))
* add yarn cache to improve workflow speed ([afb5475](https://github.com/graasp/graasp-deploy/commit/afb54753cb32f0ef30f123596a3123ae2b268b7e))
* caller workflow templates for ecs-backend ([3df3c51](https://github.com/graasp/graasp-deploy/commit/3df3c518598620a353842531f8ecb15a5279f29c))
* caller workflow templates for s3 and ecs cd ([3ffac44](https://github.com/graasp/graasp-deploy/commit/3ffac44f86325d0d5c3ee987f00ccee3f0e73526))
* caller workflow templates for s3 ecs cdelivery ([1ab9d65](https://github.com/graasp/graasp-deploy/commit/1ab9d651a31ce02c2594a05ecc6d098a2f51df4b))
* ecs workflow templates ([9a4d426](https://github.com/graasp/graasp-deploy/commit/9a4d4264ef8cbce9d5f72802470abbef6bdbf4e0))
* include scheduled run for workflows ([2d58f92](https://github.com/graasp/graasp-deploy/commit/2d58f926ec3e68438d5bb5e85c545513f7938a12))
* include staging version of non existent repo ([b04b5ee](https://github.com/graasp/graasp-deploy/commit/b04b5eeefe060c80020cfe57edd961859b2b9864))
* input specific stack to deploy ([437fd4f](https://github.com/graasp/graasp-deploy/commit/437fd4f00750798bce58099bdbd7b201db08808e))
* new env variable in s3 deployments ([e545e23](https://github.com/graasp/graasp-deploy/commit/e545e23e196a2bd6b96be494f3acf230342e875b))
* postman test collection and environment ([e59404c](https://github.com/graasp/graasp-deploy/commit/e59404c2e89eecf0f7b6350a12c325b5ce26e930))
* Readme first version ([5056d19](https://github.com/graasp/graasp-deploy/commit/5056d193299af968a2d642a46364c1fb21271134))
* Readme version 2 ([ae9ce88](https://github.com/graasp/graasp-deploy/commit/ae9ce8871c3042c495b9ea913569a780e249c46c))
* reusable workflows for cdelivery s3 and ecs ([37657b9](https://github.com/graasp/graasp-deploy/commit/37657b9095d84b8ca23140b0e2942f62c0e8d73f))
* smoke test workflow ([d239b9a](https://github.com/graasp/graasp-deploy/commit/d239b9a1d511c4f1862364cd38c3994d9f4edf9b))
* template to trigger update staging version ([f1f4cd1](https://github.com/graasp/graasp-deploy/commit/f1f4cd1935987649f2a03a5026a8aefdfa5e5c8f))
* trigger deployments for new versions only ([068cae5](https://github.com/graasp/graasp-deploy/commit/068cae58916dc0bcfaf9ba25cef780a9ed59689b))
* update readme with workflow status badge ([ad57405](https://github.com/graasp/graasp-deploy/commit/ad57405e600a2ac953ebc76c49db8a7bc747d18a))
* workflow for new cdeployment approach ([e137eaa](https://github.com/graasp/graasp-deploy/commit/e137eaa24d63aa1d9cf9939861492a0b476edef9))
* workflow to trigger deployment of new stack ([f7ad5a4](https://github.com/graasp/graasp-deploy/commit/f7ad5a41433942f952cc9b6d62da7ba325e00e98))
* workflow to update staging versions in deploy ([9a239b8](https://github.com/graasp/graasp-deploy/commit/9a239b86004dce610944d65e111aa35ae594316e))


### Bug Fixes

* `set-output` deprecation warning ([c42cedc](https://github.com/graasp/graasp-deploy/commit/c42cedc884039cfd99c10298a5b93f3422ac1c7b)), closes [#61](https://github.com/graasp/graasp-deploy/issues/61)
* add missing branch in cintegration templates ([4fc0850](https://github.com/graasp/graasp-deploy/commit/4fc085081e9f4a3c2132ec3a2dc62511d17616e5))
* add missing EOF extra line ([996c945](https://github.com/graasp/graasp-deploy/commit/996c9458276f5f40f9cac3ee2cbcd9d219230891))
* add missing secrets ([3cddfa8](https://github.com/graasp/graasp-deploy/commit/3cddfa819818c2a5ee64097f0e9d8dd18e9970a0))
* add necessary env variables to ci-s3.yml ([5ec7812](https://github.com/graasp/graasp-deploy/commit/5ec7812df37e1bbee3e1b40fec42c73860ea6df5))
* add requested improvements after review ([7c4a18f](https://github.com/graasp/graasp-deploy/commit/7c4a18fdf4e3b558109fffbf9f2f7bb8ffda12b9))
* cache key ([08d511c](https://github.com/graasp/graasp-deploy/commit/08d511cc6a6d120f1347643d117f8b55cb123e1d))
* correct typo ([6341a2a](https://github.com/graasp/graasp-deploy/commit/6341a2a108787d7df3585361efc60d079731ce46))
* cypress cache path ([6c3823f](https://github.com/graasp/graasp-deploy/commit/6c3823fd10ae9f37c1f2cc65ef15a5eb54178827))
* delete  202208291250-staging-versions.json ([8c8867d](https://github.com/graasp/graasp-deploy/commit/8c8867d60834fe24877f253312d80900f40eda78))
* delete 202208291244-staging-versions.json ([1f0abbe](https://github.com/graasp/graasp-deploy/commit/1f0abbea8c41eb61a714f0017e6ef2441c832759))
* delete 202208291540-staging-versions.json ([2bde5c3](https://github.com/graasp/graasp-deploy/commit/2bde5c31cc2179d34ab063cc9b5a35bf364a2954))
* empty stack bug ([d7559fa](https://github.com/graasp/graasp-deploy/commit/d7559fa88c503c4d877dd170941e88b214682819))
* fix called endpoint for specific branch ([5fa66a3](https://github.com/graasp/graasp-deploy/commit/5fa66a3b1f186c4bfc00c1a3cb3fd2d476fd26f6))
* if clause ([138201a](https://github.com/graasp/graasp-deploy/commit/138201a8e6109d772ca27e2d7fe3811fd2ffefb5))
* include changes after review ([b95ad69](https://github.com/graasp/graasp-deploy/commit/b95ad69156e2a95c4ea998f092424e55afdc6a7a))
* include changes after review ([82a2db4](https://github.com/graasp/graasp-deploy/commit/82a2db44243c245179ba065912782ad045f44ec8))
* include changes proposed after review ([a34c977](https://github.com/graasp/graasp-deploy/commit/a34c977e06da73a19b53a380ac7721d8dfce8fc1))
* include step to handle git changes ([021b17b](https://github.com/graasp/graasp-deploy/commit/021b17bb1b8277241ab1966b45d82888736aaac9))
* included missing env variable in s3 workflows ([7e91914](https://github.com/graasp/graasp-deploy/commit/7e9191464a3af6d3368cf5723c0b44313804bc8c))
* increase the memory size ([e21beba](https://github.com/graasp/graasp-deploy/commit/e21bebad624bd8337c95dabbec97042732093caa))
* manually update current-production-versions.json ([4eb3caa](https://github.com/graasp/graasp-deploy/commit/4eb3caa638b4f557156f0fc98d69888be7f967bb))
* manually update current-production-versions.json ([b722c48](https://github.com/graasp/graasp-deploy/commit/b722c488c8507eec667f056b3635224bd89145ba))
* minor changes ([0d833ba](https://github.com/graasp/graasp-deploy/commit/0d833bacfc0bba21b49913a7b4afd51e0e73a5ef))
* minor fix ([3d67269](https://github.com/graasp/graasp-deploy/commit/3d672691d8a9677eb8d8fdabd1fb85bcafaa632d))
* minor fix in docker build sentence ([c86de0d](https://github.com/graasp/graasp-deploy/commit/c86de0d96a439fb556443bc45ae117d24959a26d))
* minor fixes ([240e816](https://github.com/graasp/graasp-deploy/commit/240e8165cb5b19b2b06919415b948e6316a2e4e6))
* minor fixes on ci caller workflow templates ([7ae3213](https://github.com/graasp/graasp-deploy/commit/7ae32139ebc4e9e69f9d522f8a0f47734505ec64))
* missing env variable ([5049607](https://github.com/graasp/graasp-deploy/commit/5049607f97ad484178fe228673f1802974af834f))
* modify docker build command ([9a902af](https://github.com/graasp/graasp-deploy/commit/9a902af5ab284e1ace4ec8e8167768ab39b0c936))
* move caller to .github repository ([96d523b](https://github.com/graasp/graasp-deploy/commit/96d523b1940ea870bbe824fa22d9873089173e15))
* move caller workflow to .github repository ([31aa0e1](https://github.com/graasp/graasp-deploy/commit/31aa0e15727561c8915992d8ece4941a061b7b80))
* new cypress cache path ([2ea8e1c](https://github.com/graasp/graasp-deploy/commit/2ea8e1c7d5d7e6ecb20dcccc768348b78f844a61))
* new test workflow name ([3ce4c26](https://github.com/graasp/graasp-deploy/commit/3ce4c26a6fbafda899d4d763f14fc2d874f2859b))
* rebase file ([4b654ff](https://github.com/graasp/graasp-deploy/commit/4b654ff61a2108f558e3581a32289fd81305c3c3))
* remove ci refactoring ([3ed087e](https://github.com/graasp/graasp-deploy/commit/3ed087e8208a141dba3e88c62fc601fdc6d71149))
* remove conflict clause ([907a37f](https://github.com/graasp/graasp-deploy/commit/907a37f6b47667c55bd6ecba0c6c9f13c17debba))
* remove missing e2e job ([d518c70](https://github.com/graasp/graasp-deploy/commit/d518c7033bebebcff0fe9f2bca3339fe32ff0eb5))
* remove unnecessary clause ([a85a863](https://github.com/graasp/graasp-deploy/commit/a85a8638a246a42699043c912d591cbf19c9da4e))
* remove unnecessary secret ([1edb5f7](https://github.com/graasp/graasp-deploy/commit/1edb5f78862563ca5ab3c8c11ba704007d0a8a69))
* remove unnecessary step ([35813d7](https://github.com/graasp/graasp-deploy/commit/35813d74b4bf1b03c7a74a44cea9b874b01c126d))
* remove unused env variable ([7c7b4a3](https://github.com/graasp/graasp-deploy/commit/7c7b4a3772cad71f6892ba38c90f19faf1810d28))
* remove unused files ([898a6f3](https://github.com/graasp/graasp-deploy/commit/898a6f39af6905a08263b1e3ca7ce81bcc7d6c30))
* removed repeated input secret ([cad7a58](https://github.com/graasp/graasp-deploy/commit/cad7a5857a03d55fe5709ccb4f60123bbcf2103d))
* rename staging-versions folder ([03007ac](https://github.com/graasp/graasp-deploy/commit/03007ac29925bd0c7796d51ae4989c485fe0e164))
* solve binary issue ([50176f3](https://github.com/graasp/graasp-deploy/commit/50176f3238dd5c4a226a7e035731db664e1076b5))
* solve commit bug ([a9a489c](https://github.com/graasp/graasp-deploy/commit/a9a489cc6721bb9b7827f6c2ff78aca7add35b5c))
* solve cypress cache binary issue ([1df0b03](https://github.com/graasp/graasp-deploy/commit/1df0b036a79be00085f74c9648d5f6cceebf6daf))
* solve empty stack bug ([b2ba818](https://github.com/graasp/graasp-deploy/commit/b2ba818d55fccf1c5cfa4fa42e96fa49ce2b2363))
* solve heap out of memory error ([3c806d0](https://github.com/graasp/graasp-deploy/commit/3c806d07c981f62ba680173d6ba087fe21a98bd3))
* solve invalid reference issue ([f83ca03](https://github.com/graasp/graasp-deploy/commit/f83ca03898859d85a997eeb60a1dc94548c6d5cb))
* solve merging issue ([7245e71](https://github.com/graasp/graasp-deploy/commit/7245e716d0c211babefa723299c9268ec1413f46))
* solve second commit issue ([14ada1f](https://github.com/graasp/graasp-deploy/commit/14ada1f07366e3a079e2e6a7752095f69a2694d5))
* solve token issue ([7d2ed00](https://github.com/graasp/graasp-deploy/commit/7d2ed00ab7753644b80506ae5c29ad2a257a3ff6))
* solved requested changes ([2ee1492](https://github.com/graasp/graasp-deploy/commit/2ee1492bcef76340d3c937925a3f5207127e382b))
* style yaml syntax ([e83b9d6](https://github.com/graasp/graasp-deploy/commit/e83b9d6eb0195a32af1154bfaa8916c7465dd7c2))
* try cypress cache path ([4732943](https://github.com/graasp/graasp-deploy/commit/473294345a7029763001edb27d54b30fd4ab4b42))
* typo ([639ca0e](https://github.com/graasp/graasp-deploy/commit/639ca0e487c464ac5d10d25f8ed82e19169c8227))
* typo ([68ff876](https://github.com/graasp/graasp-deploy/commit/68ff876ef879a36fe29f1afa464575cce7f59226))
* typo ([59fea22](https://github.com/graasp/graasp-deploy/commit/59fea22e2b0645d70578008f9a10e9a356c78265))
* typo ([6377cec](https://github.com/graasp/graasp-deploy/commit/6377cecd21e4262cf33ff16955abe12dbbb7cb88))
* typo in env variable ([b71d5ec](https://github.com/graasp/graasp-deploy/commit/b71d5ecd92f89f8f22f1777f55393f58925cb392))
* typo in env variable ([4fd0614](https://github.com/graasp/graasp-deploy/commit/4fd0614311aa9cc8f38dc92deedf3bc927180912))
* typo in file name ([9a235bb](https://github.com/graasp/graasp-deploy/commit/9a235bb70c7787c1a3a66d71982e650d17bf3151))
* typo in gh-pages endpoint ([cd0ecec](https://github.com/graasp/graasp-deploy/commit/cd0ececab2e5c71b8d5b79d06ffba5998cadd18d))
* typo in input variables ([7d87fb9](https://github.com/graasp/graasp-deploy/commit/7d87fb91744213caf1c043189f09bee29fabe11b))
* typo in input variables ([720f3d7](https://github.com/graasp/graasp-deploy/commit/720f3d758911658c30c5784786bfbcf1481d8fe7))
* typo in invalidation command ([e8d867f](https://github.com/graasp/graasp-deploy/commit/e8d867feae69292a412f781299ade402e047b7a4))
* typo in secret ([9ee57db](https://github.com/graasp/graasp-deploy/commit/9ee57dbb89f70216c9af5d3f286422cad2e1d568))
* typo in stagingVersions file ([5dfbb1f](https://github.com/graasp/graasp-deploy/commit/5dfbb1fe538c6f5386b7b93bd0a78caa8f9608f1))
* typo in trigger-stage.yml ([55e4821](https://github.com/graasp/graasp-deploy/commit/55e4821427d481f96fa186f1a6a82a6329976345))
* update .gitignore ([bfbbeec](https://github.com/graasp/graasp-deploy/commit/bfbbeecd66cc756a89caa9b0847fbe5f1e0477a1))
* update .gitignore ([fd39aaa](https://github.com/graasp/graasp-deploy/commit/fd39aaaee5c0c168a431e427bd081918db6137ef))
* update commit messages to follow conventional commits ([92e591d](https://github.com/graasp/graasp-deploy/commit/92e591d116867fd928edaed128eed3efa0618143))
* update current-staging-versions.json ([780332f](https://github.com/graasp/graasp-deploy/commit/780332f5a8e732f183218677c899933494d8f325))
* update current-staging-versions.json ([e3e1fd5](https://github.com/graasp/graasp-deploy/commit/e3e1fd5084ffe7fd42712d56b03ca1160c23a73e))
* update current-staging-versions.json ([c8ecb58](https://github.com/graasp/graasp-deploy/commit/c8ecb582d38029f817f136de202d00f124276e05))
* update current-staging-versions.json ([f47f784](https://github.com/graasp/graasp-deploy/commit/f47f7847bd511c8f01e541b3f1dbbe6cc9344ab3))
* update current-staging-versions.json ([bc4eaad](https://github.com/graasp/graasp-deploy/commit/bc4eaad33a749a685003bdade0ecd5741be93b49))
* update current-staging-versions.json ([56395fe](https://github.com/graasp/graasp-deploy/commit/56395fe4e78b959863435d6afb4c83f0baea0b18))
* update setup-python action version ([ce1189f](https://github.com/graasp/graasp-deploy/commit/ce1189f113c6793b6efa3ffcee14d8bd02be9801))
* wrong cypress cache  path ([6a4e5a0](https://github.com/graasp/graasp-deploy/commit/6a4e5a092cc91a00042b72d4332e94c296640ca1))
* wrong syntax in condition ([ebf0e1d](https://github.com/graasp/graasp-deploy/commit/ebf0e1d92ebc72dc27c9e9c27bbf61326b207b79))
* wrong syntax in condition ([c43a681](https://github.com/graasp/graasp-deploy/commit/c43a68151d8087aa51958caf59ae4219d9a58bba))
* wrong syntax in condition ([ecb1840](https://github.com/graasp/graasp-deploy/commit/ecb1840a40408885a1f3ddb2859fb9d5addd194b))
* wrong tag and registry reference ([8e41828](https://github.com/graasp/graasp-deploy/commit/8e418281cccd917fd32bf7abde031bff7c08ee75))
* wrong tag reference ([5872dbe](https://github.com/graasp/graasp-deploy/commit/5872dbe541b46a2cdeebba51378e29e723c4fbb0))
