<?php

return [
    'secret' => env('JWT_SECRET'),
    'ttl' => 60,
    'refresh_ttl' => 20160,
    'algo' => 'HS256',
    'required_claims' => ['iss', 'iat', 'exp', 'nbf', 'sub', 'jti'],
    'lock_subject' => true,
    'leeway' => 0,
    'blacklist_enabled' => env('JWT_BLACKLIST_ENABLED', true),
    'blacklist_grace_period' => env('JWT_BLACKLIST_GRACE_PERIOD', 0),
    'show_blacklist_exception' => env('JWT_SHOW_BLACKLIST_EXCEPTION', false),
    'decrypt_cookies' => false,
];
