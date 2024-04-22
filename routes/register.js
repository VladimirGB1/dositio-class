import createError from '@fastify/error'
export default async function register(app, options){
    const InvalidRegisterError = createError('InvalidRegisterError', 'Registro Inválido', 400);

    const users = app.mongo.db.collection('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    email: { type: 'string' },
                    password: {type: 'string'}
                },
                required: ['email', 'password']
            }
        },
        config: {
            requireAuthentication: false
        }
    }, async (request, reply) => {
        let user = request.body;
        
        await users.insertOne(user);

        return reply.code(201).send();
    });

}