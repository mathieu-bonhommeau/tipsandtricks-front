import { Tag } from '../../../tags/models/tag.model';
import { Post } from '../../models/post.model.ts';

export default class PostsTestBuilder {
    private _id: number | null = 1;
    private _title: string = 'Post Title';
    private _slug: string = 'post-title';
    private _command: string = 'Post Command';
    private _description: string = 'Post description';
    private _message: string = 'Post message';
    private _username: string = 'username';
    private _published_at: string = '2022-12-17T03:24:00';
    private readonly _created_at: string = '2022-12-17T03:24:00';
    private readonly _updated_at: string | null = null;
    private readonly _user_id: number = 1;
    private readonly _tags: Array<Tag> = [
        { id: 1, label: 'Tag 1', created_at: '2022-12-17T03:24:00', updated_at: null },
    ];

    buildPost(): Post {
        return {
            id: this._id,
            title: this._title,
            slug: this._slug,
            command: this._command,
            description: this._description,
            message: this._message,
            published_at: this._published_at,
            created_at: this._created_at,
            updated_at: this._updated_at,
            user_id: this._user_id,
            username: this._username,
            tags: this._tags,
        } as Post;
    }

    setId(value: number | null) {
        this._id = value;
        return this;
    }

    setTitle(value: string) {
        this._title = value;
        return this;
    }

    setSlug(value: string) {
        this._slug = value;
        return this;
    }

    setCommand(value: string) {
        this._command = value;
        return this;
    }

    setDescription(value: string) {
        this._description = value;
        return this;
    }

    setMessage(value: string) {
        this._message = value;
        return this;
    }
}
