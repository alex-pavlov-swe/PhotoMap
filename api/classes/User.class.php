<?php

class User
{
    protected $dataMap = [
        'id' => ['type' => 'int'],

        'created' => ['type' => 'timestamp'],
        'updated' =>  ['type' => 'timestamp'],

        'email' => ['type' => 'string'],
        'name' => ['type' => 'string', 'sqlref' => "CONCAT('name_first', ' ', 'name_last"],
        'name_first' => ['type' => 'string'],
        'name_last' => ['type' => 'string'],
        'avatar' => ['type' => 'string'],

        'passhash' => ['type' => 'string'],

    ];

    /**
     * @param API $API
     * @param int[] $ids
     * @param mixed[]|null $opts
     * @return User[]
     */
    protected static function fetchFromDb(API $API, array $ids, array $opts = [])
    {
        $SELECT = [
            "`id`",
            "`created`",
            "`updated`",

            "`email`",
            "CONCAT(`name_first`, ' ', `name_last`) AS `name`",
            "`name_first`",
            "`name_last`",
            "`avatar`",
            "`passhash`"
        ];
        $FROM = ["`user`"];
        $WHERE = ["1"];
        $ORDER = [];
        //$LIMIT = API::QUERY_LIMIT;
        //$binds  = [];
    }
}
