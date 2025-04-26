const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const userId = ctx.params.userId;
    const url = `https://www.threads.net/@${userId}`;
    const apiUrl = `https://rsshub.app/threads/user/${userId}`;

    const { data } = await got(apiUrl);

    ctx.state.data = {
        title: `Threads User ${userId}`,
        link: url,
        description: `Threads posts by user ${userId}`,
        item: data.items.map((item) => ({
            title: item.title,
            description: item.description,
            pubDate: parseDate(item.pubDate),
            link: item.link,
        })),
    };
};
