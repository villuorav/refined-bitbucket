import { h } from 'dom-chef';

const onChange = ({ target, target: { checked: showComments } }) => {
    const diff = target.closest('section.bb-udiff');
    const comments = Array.from(
        diff.getElementsByClassName('comment-thread-container')
    );

    comments.forEach(comment => {
        comment.style.display = showComments ? '' : 'none';
    });
};

export default function insertShowComments(section) {
    if (section.getElementsByClassName('__rbb-show-comments').length) {
        return;
    }

    // if (!section.getElementsByClassName('comment-thread-container').length) {
    //     return;
    // }

    // TODO: take into account when diff has comments on previous versino of the file
    // TODO: take into account when diff didn't load
    // TODO: take into account comments added dynamically

    const showCommentsCheckbox = (
        <span className="__rbb-show-comments">
            <label>
                <input type="checkbox" checked onChange={onChange} />
                Show comments
            </label>
        </span>
    );
    // Some style properties can't be applied with JSX,
    // don't know why.
    showCommentsCheckbox.firstChild.style.fontSize = '12px';

    const diffActions = section.querySelector('.diff-actions.secondary');
    diffActions.style.minWidth = '480px';
    diffActions.style.textAlign = 'right';
    diffActions.insertBefore(showCommentsCheckbox, diffActions.firstChild);
}
