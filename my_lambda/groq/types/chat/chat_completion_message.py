# File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

from typing import List, Optional
from typing_extensions import Literal

from ..._models import BaseModel
from .chat_completion_message_tool_call import ChatCompletionMessageToolCall

__all__ = ["ChatCompletionMessage", "FunctionCall"]


class FunctionCall(BaseModel):
    arguments: str
    """
    The arguments to call the function with, as generated by the model in JSON
    format. Note that the model does not always generate valid JSON, and may
    hallucinate parameters not defined by your function schema. Validate the
    arguments in your code before calling your function.
    """

    name: str
    """The name of the function to call."""


class ChatCompletionMessage(BaseModel):
    content: Optional[str] = None
    """The contents of the message."""

    role: Literal["assistant"]
    """The role of the author of this message."""

    function_call: Optional[FunctionCall] = None
    """Deprecated and replaced by `tool_calls`.

    The name and arguments of a function that should be called, as generated by the
    model.
    """

    reasoning: Optional[str] = None
    """The model's reasoning for a response.

    Only available for reasoning models when requests parameter reasoning_format has
    value `parsed.
    """

    tool_calls: Optional[List[ChatCompletionMessageToolCall]] = None
    """The tool calls generated by the model, such as function calls."""
