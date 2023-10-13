import { Tag } from '../../../tags/models/tag.model';
import { Tips } from '../../models/tips.model';

export default class TipsTestBuilder {
    private readonly _id: number | null = 1;
    private _title: string = 'Tips Title';
    private _command: string = 'Tips Command';
    private _description: string = 'Tips description';
    private _published_at: string = '2022-12-17T03:24:00';
    private readonly _created_at: string = '2022-12-17T03:24:00';
    private readonly _updated_at: string | null = null;
    private readonly _user_id: number = 1;
    private readonly _tags: Array<Tag> = [
        { id: 1, label: 'Tag 1', created_at: '2022-12-17T03:24:00', updated_at: null },
    ];

    buildTips(): Tips {
        return {
            id: this._id,
            title: this._title,
            command: this._command,
            description: this._description,
            published_at: this._published_at,
            created_at: this._created_at,
            updated_at: this._updated_at,
            user_id: this._user_id,
            tags: this._tags,
        } as Tips;
    }
}
