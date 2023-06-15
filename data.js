const users = [
{
    id: '1',
    fullname: 'ümit',
    age: 21
},
{
    id:'2',
    fullname: 'yusuf',
    age: 23
},

];

const posts = [
    {
        id: '1',
        title: "ümitin gönderisi",
        user_id:'1'
    },

    {
        id: '2',
        title: "ümitin diğer gönderisi",
        user_id:'1'
    },
    {
        id: '3',
        title: "yusufun gönderisi",
        user_id:'2'
    },
];

const comments = [
    {
        id: '1',
        text: "ümitin yorumu",
        post_id:'1',
        user_id:'1'
    },
    {
        id: '2',
        text: "ümitin yorumu",
        post_id:'2',
        user_id:'1'
    },
    {
        id: '3',
        text: "yusufun yorumu",
        post_id:'3',
        user_id:'2'
    },
    {
        id: '4',
        text: "yusufun yorumu",
        post_id:'3',
        user_id:'2'
    },
];

module.exports = {
    users,
    posts,
    comments
};