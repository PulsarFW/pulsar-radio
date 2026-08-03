fx_version 'cerulean'
game 'gta5'

name 'Pulsar Radio'
description 'Handheld radio'
author 'Artmines - maintained for Pulsar Framework'
url 'https://pulsarframe.work'
version 'v1.0.0'

version_check 'yes'
github 'https://github.com/PulsarFW/pulsar_radio'

client_script '@pulsar_core/components/cl_error.lua'
shared_script '@pulsar_core/core/sh_pulsar.lua'
client_script '@pulsar_pwnzor/client/check.lua'

client_scripts({
	'client/*.lua',
})

files({
	'ui/dist/index.html',
	'ui/dist/assets/*',
	'config/shared.lua',
})

ui_page 'ui/dist/index.html'
lua54 'yes'