const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = {
    path: '/threads/user/:userId',
    name: 'threads-user',
    handler: async (ctx) => {
        const { userId } = ctx.params;
        const url = `https://www.threads.net/@${userId}`;

        const { data } = await got(`https://rsshub.app/threads/user/${userId}`);

        ctx.state.data = {
            title: `Threads User ${userId}`,
            link: url,
            item: data.items.map((item) => ({
                title: item.title,
                description: item.description,
                pubDate: parseDate(item.pubDate),
                link: item.link,
            })),
        };
    },
};
